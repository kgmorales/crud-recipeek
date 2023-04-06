import { Injectable } from '@angular/core';
import { RecipesStateService } from '@core/services';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeGridService {
  favoriteRecipes$ = this.recipeStateService.favoriteRecipes$;

  constructor(private recipeStateService: RecipesStateService) {
    this.favoriteRecipes$.subscribe(x => console.log(x));
  }
}
