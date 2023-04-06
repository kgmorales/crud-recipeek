import { Injectable } from '@angular/core';
import { RecipesStateService } from '@core/services';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeGridService {
  favoriteRecipes$ = this.recipeStateService.favoriteRecipes$;
  thing$ = this.recipeStateService.allRecipes$;

  constructor(private recipeStateService: RecipesStateService) {
    this.thing$.subscribe(x => console.log(x));
  }
}
