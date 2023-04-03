import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject } from 'rxjs';

//? Core
import * as coreConst from '@core/constants';
import { AllRecipes, Category, Recipe } from '@core/models';
import * as coreUtils from '@core/utils';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  readonly scrapedRecipeSubject$ = new ReplaySubject<Recipe>(1);
  scrapedRecipe$ = this.scrapedRecipeSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
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

  getScrapedRecipe(url: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${coreConst.url.localHost}/scrapeRecipe?url=${url}`);
  }

  storeScrapedRecipe(recipe: Recipe): void {
    this.scrapedRecipeSubject$.next(recipe);
  }
}
