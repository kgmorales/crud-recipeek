import { Injectable } from '@angular/core';
import { RecipesStateService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class RecipeGridService {
  favoriteRecipes$ = this.recipeStateService.favorites$;
  categories$ = this.recipeStateService.categories$;

  constructor(private recipeStateService: RecipesStateService) {}
}
