import { Injectable } from '@angular/core';
import { Observable, combineLatest, concatMap, filter, map, take } from 'rxjs';

import { Category, Recipe, RecipeState } from '@core/models';
import { RecipesStateService } from '@core/services/';

import * as utils from './utils';
import { Preview } from './models';

@Injectable({ providedIn: 'root' })
export class HomeService {
  homePreviews$ = combineLatest([
    this.recipesStateService.favorites$,
    this.recipesStateService.categories$,
  ]).pipe(map(([favorites, categories]) => this.buildPreview(favorites, categories)));

  constructor(private recipesStateService: RecipesStateService) {}

  buildPreview(recipes: Recipe[], categoryTypes: Category[]): Preview[] {
    const previewRecipes: Recipe[] = utils.getMultipleRandom(recipes, 4);

    return previewRecipes.map(recipe => {
      const { image_url, name } = recipe;
      /**
       * turns the category from paprika db into category string names.
       */
      const categories = categoryTypes
        .filter(category => recipe.categories.includes(category.uid))
        .map(category => category.name);

      const cook_time: number = Number(recipe.cook_time.replace(/\D/g, ''));

      const created = Date.parse(recipe.created);

      const rating = Array(recipe.rating)
        .fill(0)
        .map((_, i: number) => i);

      return { categories, cook_time, created, image_url, name, rating };
    });
  }
}
