import { Injectable } from '@angular/core';
import { RecipesStateService } from '@core/services';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeGridService {
  favoriteRecipes$ = this.recipeStateService.favoriteRecipes$;
  categories$ = this.recipeStateService.categories$;

  constructor(private recipeStateService: RecipesStateService) {}
}
