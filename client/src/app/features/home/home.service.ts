import { Injectable } from '@angular/core';
import { Observable, filter, map, take } from 'rxjs';

import { Recipe } from '@core/models';
import { RecipesStateService } from '@core/services/';

import * as utils from './utils';

@Injectable({ providedIn: 'root' })
export class HomeService {
  categories$ = this.recipesStateService.categories$;

  favoritesPreview$ = this.recipesStateService.favoriteRecipes$.pipe(
    map(recipes => this.buildFavoritesPreview(recipes))
  );
  constructor(private recipesStateService: RecipesStateService) {
    this.favoritesPreview$.subscribe(x => console.log(x));
  }

  buildFavoritesPreview(recipes: Recipe[]): Partial<Recipe>[] {
    const previewRecipes: Recipe[] = utils.getMultipleRandom(recipes, 3);

    return previewRecipes.map(recipe => {
      const { categories, cook_time, created, image_url, name, rating } = recipe;

      return { categories, cook_time, created, image_url, name, rating };
    });
  }
}
