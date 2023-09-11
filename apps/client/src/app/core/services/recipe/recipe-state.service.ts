import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, filter, map, shareReplay } from 'rxjs';

import { Category as ICategory, Filter as IFilter, Recipe as IRecipe, RecipeState } from '@core/interfaces';
import { RecipesApiService } from '@core/services';
import { StateService } from '@core/services/state.service';

const initialState: RecipeState = {
  categories: [] as ICategory[],
  recipes: [] as IRecipe[],
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
  private recipesFiltered$ = this.select((state) => {
    return getRecipesFiltered(state.recipes, state.filter);
  });

  categories$: Observable<ICategory[]> = this.select(
    (state) => state.categories
  );

  recipes$: Observable<IRecipe[]> = this.select((state) => state.recipes);

  favorites$: Observable<IRecipe[]> = this.recipesFiltered$.pipe(
    map((recipes) => recipes.filter((recipe) => recipe.on_favorites))
  );

  notFavorites$: Observable<IRecipe[]> = this.recipesFiltered$.pipe(
    map((recipes) => recipes.filter((recipe) => !recipe.on_favorites))
  );

  filter$: Observable<IFilter> = this.select((state) => state.filter);

  /**
   * Observable of a selected Recipe by uid.
   */
  selectedRecipe$ = this.select((state) => {
    if (state.selectedUID === '') return new IRecipe();

    return state.recipes.find((item) => item.uid === state.selectedUID);
  }).pipe(
    // Multicast to prevent multiple executions due to multiple subscribers
    shareReplay({ bufferSize: 1, refCount: true })
  );

  searchResult$: Observable<IRecipe[]> = this.recipesFiltered$;

  hasSearchTerm$: Observable<boolean> = this.select((state) => {
    const searchTerm = state.filter.search;
    return !!searchTerm && searchTerm.trim().length > 0;
  });

  scrapedRecipe$: unknown;

  constructor(
    private apiService: RecipesApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(initialState);

    this.load();
  }

  selectRecipe(recipe: IRecipe): void {
    this.setState({ selectedUID: recipe.uid });
  }

  initNewRecipe(): void {
    this.setState({ selectedUID: '' });
  }

  clearSelectedRecipe(): void {
    this.setState({ selectedUID: undefined });
  }

  updateFilter(filter: IFilter): void {
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
      // Clear State
      this.setState({
        filter: {
          ...this.state.filter,
          search: '',
        },
      });
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

  create(recipe: IRecipe): void {
    this.apiService.createRecipe(recipe).subscribe((newRecipe) => {
      this.setState({
        recipes: [...this.state.recipes, newRecipe],
        selectedUID: newRecipe.uid,
      });
    });
  }

  update(recipe: IRecipe): void {
    this.apiService.updateRecipe(recipe).subscribe((updatedRecipe) => {
      this.setState({
        recipes: this.state.recipes.map((item) =>
          item.uid === recipe.uid ? updatedRecipe : item
        ),
      });
    });
  }

  delete(recipe: IRecipe): void {
    this.apiService.deleteRecipe(recipe).subscribe(() => {
      this.setState({
        selectedUID: '',
        recipes: this.state.recipes.filter((item) => item.uid !== recipe.uid),
      });
    });
  }
}

function getRecipesFiltered(recipes: IRecipe[], filter: IFilter): IRecipe[] {
  return recipes.filter((item: IRecipe) => {
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
