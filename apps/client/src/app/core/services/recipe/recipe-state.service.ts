import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, combineLatest, filter, map, shareReplay } from 'rxjs';

import { StateService } from '@core/services/state.service';
import { Category, Filter, Recipe, RecipeState } from '@core/interfaces';
import { RecipesApiService } from '@core/services';

const initialState: RecipeState = {
  categories: [] as Category[],
  recipes: [] as Recipe[],
  selectedUID: undefined ?? ('' as string),
  filter: {
    search: '' as string,
    category: {
      isFastCookTime: false,
      isFavorite: false,
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class RecipesStateService extends StateService<RecipeState> {
  private previousUrl: string;
  private recipesFiltered$ = this.select((state) => {
    return getRecipesFiltered(state.recipes, state.filter);
  });

  categories$: Observable<Category[]> = this.select(
    (state) => state.categories
  );

  recipes$: Observable<Recipe[]> = this.select((state) => state.recipes);

  favorites$: Observable<Recipe[]> = this.recipesFiltered$.pipe(
    map((recipes) => recipes.filter((recipe) => recipe.on_favorites))
  );

  notFavorites$: Observable<Recipe[]> = this.recipesFiltered$.pipe(
    map((recipes) => recipes.filter((recipe) => !recipe.on_favorites))
  );

  filter$: Observable<Filter> = this.select((state) => state.filter);
  /**
   * Observable of a selected Recipe by uid.
   */
  selectedRecipe$ = this.select((state) => {
    if (state.selectedUID === '') return new Recipe();

    return state.recipes.find((item) => item.uid === state.selectedUID);
  }).pipe(
    // Multicast to prevent multiple executions due to multiple subscribers
    shareReplay({ bufferSize: 1, refCount: true })
  );

  searchResult$: Observable<Recipe[]> = this.recipesFiltered$;

  hasSearchTerm$: Observable<boolean> = this.select((state) => {
    const searchTerm = state.filter.search;
    return !!searchTerm && searchTerm.trim().length > 0;
  });

  scrapedRecipe$: unknown;

  constructor(
    private apiService: RecipesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super(initialState);

    this.load();
  }

  selectRecipe(recipe: Recipe): void {
    this.setState({ selectedUID: recipe.uid });
  }

  initNewRecipe(): void {
    this.setState({ selectedUID: '' });
  }

  clearSelectedRecipe(): void {
    this.setState({ selectedUID: undefined });
  }

  updateFilter(filter: Filter): void {
    this.setState({
      filter: {
        ...this.state.filter,
        ...filter,
      },
    });

    if (filter.search.trim() !== '') {
      // Navigate to the search results page
      this.router.navigateByUrl('/search');
    } else {
      // Navigate back to the previous route
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  //* FIRE INITIAL API CALLS
  /**
   * THIS BUILDS RECIPE INITIAL STATE.
   * @default RecipeState
   */
  load(): void {
    combineLatest([
      this.apiService.getCategories(),
      this.apiService.getRecipes(),
    ])
      .pipe(
        filter((calls) => !!calls),
        map(([categories, recipes]) => ({ categories, recipes }))
      )
      .subscribe((recipeRawState) => {
        this.setState({
          categories: recipeRawState.categories,
          recipes: recipeRawState.recipes,
        });
      });
  }

  create(recipe: Recipe): void {
    this.apiService.createRecipe(recipe).subscribe((newRecipe) => {
      this.setState({
        recipes: [...this.state.recipes, newRecipe],
        selectedUID: newRecipe.uid,
      });
    });
  }

  update(recipe: Recipe): void {
    this.apiService.updateRecipe(recipe).subscribe((updatedRecipe) => {
      this.setState({
        recipes: this.state.recipes.map((item) =>
          item.uid === recipe.uid ? updatedRecipe : item
        ),
      });
    });
  }

  delete(recipe: Recipe): void {
    this.apiService.deleteRecipe(recipe).subscribe(() => {
      this.setState({
        selectedUID: '',
        recipes: this.state.recipes.filter((item) => item.uid !== recipe.uid),
      });
    });
  }
}

function getRecipesFiltered(recipes: Recipe[], filter: Filter): Recipe[] {
  return recipes.filter((item: Recipe) => {
    return (
      item.name.toUpperCase().indexOf(filter.search.toUpperCase()) > -1 &&
      (filter.category.isFastCookTime
        ? Number(item.cook_time.replace(/regExp/g, ''))
        : true) &&
      (filter.category.isFavorite ? item.on_favorites : true) &&
      item.ingredientsList?.some((ingredient) =>
        ingredient.toUpperCase().includes(filter.search.toUpperCase())
      )
    );
  });
}
