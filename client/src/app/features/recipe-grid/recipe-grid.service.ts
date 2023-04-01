import { Injectable } from '@angular/core';
import { RecipeService } from '@core/services';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeGridService {
  recipes$ = this.recipeService.getAllRecipes();

  constructor(private recipeService: RecipeService) {}
}
