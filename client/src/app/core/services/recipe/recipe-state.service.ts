import { Injectable } from '@angular/core';
import { StateService } from '../state.service';
import { Category, Filter, Recipe } from '../../models';

import { Observable, combineLatest, filter, map, shareReplay } from 'rxjs';
import { RecipesApiService } from './recipe-api.service';

interface RecipeState {
  categories: Category[];
  recipes: Recipe[];
  filter: Filter;
  selectedUID: string;
}

const initialState: RecipeState = {
  categories: [],
  recipes: [],
  selectedUID: undefined ?? '',
  filter: {
    search: '',
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
  private recipesFiltered$ = this.select(state => {
    return getRecipesFiltered(state.recipes, state.filter);
  });

  recipes$: Observable<Recipe[]> = this.select(state => state.recipes);

  categories$: Observable<Category[]> = this.select(state => state.categories);

  favoriteRecipes$: Observable<Recipe[]> = this.recipesFiltered$.pipe(
    map(recipes => recipes.filter(recipe => recipe.on_favorites))
  );
  notFavoriteRecipes$: Observable<Recipe[]> = this.recipesFiltered$.pipe(
    map(recipes => recipes.filter(recipe => !recipe.on_favorites))
  );

  filter$: Observable<Filter> = this.select(state => state.filter);

  selectedRecipe$ = this.select(state => {
    if (state.selectedUID === '') return new Recipe();

    return state.recipes.find(item => item.uid === state.selectedUID);
  }).pipe(
    // Multicast to prevent multiple executions due to multiple subscribers
    shareReplay({ bufferSize: 1, refCount: true })
  );
  scrapedRecipe$: any;

  constructor(private apiService: RecipesApiService) {
    super(initialState);

    this.load();
  }

  selectRecipe(recipe: Recipe) {
    this.setState({ selectedUID: recipe.uid });
  }

  initNewRecipe() {
    this.setState({ selectedUID: '' });
  }

  clearSelectedRecipe() {
    this.setState({ selectedUID: undefined });
  }

  updateFilter(filter: Filter) {
    this.setState({
      filter: {
        ...this.state.filter,
        ...filter,
      },
    });
  }

  // API CALLS
  load() {
    combineLatest([this.apiService.getCategories(), this.apiService.getRecipes()])
      .pipe(
        filter(calls => !!calls),
        map(([categories, recipes]) => ({ categories, recipes }))
      )
      .subscribe(recipeRawState => {
        this.setState({ categories: recipeRawState.categories, recipes: recipeRawState.recipes });
      });
  }

  create(recipe: Recipe) {
    this.apiService.createRecipe(recipe).subscribe(newRecipe => {
      this.setState({
        recipes: [...this.state.recipes, newRecipe],
        selectedUID: newRecipe.uid,
      });
    });
  }

  update(recipe: Recipe) {
    this.apiService.updateRecipe(recipe).subscribe(updatedRecipe => {
      this.setState({
        recipes: this.state.recipes.map(item => (item.uid === recipe.uid ? updatedRecipe : item)),
      });
    });
  }

  delete(recipe: Recipe) {
    this.apiService.deleteRecipe(recipe).subscribe(() => {
      this.setState({
        selectedUID: '',
        recipes: this.state.recipes.filter(item => item.uid !== recipe.uid),
      });
    });
  }
}

function getRecipesFiltered(recipes: Recipe[], filter: Filter) {
  return recipes.filter((item: Recipe) => {
    return (
      item.name.toUpperCase().indexOf(filter.search.toUpperCase()) > -1 &&
      (filter.category.isFastCookTime ? Number(item.cook_time.replace(/regExp/g, '')) : true) &&
      (filter.category.isFavorite ? item.on_favorites : true)
    );
  });
}
