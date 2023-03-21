import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

//? Core
import * as coreConst from '@core/constants';
import { AllRecipes, Category, Recipe } from '@core/models';
import * as coreUtils from '@core/utils';
@Injectable({
  providedIn: 'root',
})
export class PaprikaService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<AllRecipes>(`${coreConst.url.localHost}/recipes`).pipe(
      map(allRecipes => {
        return Object.values(allRecipes)[0].map((recipe: Recipe) => {
          const ingredientsList = recipe.ingredients.split(/\r?\n/);
          const directionsList = recipe.directions.split(/\r?\n/);

          return { ...recipe, directionsList, ingredientsList };
        });
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${coreConst.url.localHost}/categories`);
  }
}
