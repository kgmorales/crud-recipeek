import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

//? Core
import * as coreConst from '@core/constants';
import { AllCategories, AllRecipes, Category, Recipe } from '@core/models';
import * as coreUtils from '@core/utils';
import { buildCategoryModel, buildRecipesModel } from '@core/utils/service';
@Injectable({
  providedIn: 'root',
})
export class RecipesApiService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<AllRecipes>(`${coreConst.url.localHost}/home`)
      .pipe(map(allRecipes => buildRecipesModel(allRecipes)));
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<AllCategories>(`${coreConst.url.localHost}/categories`)
      .pipe(map(allCategories => buildCategoryModel(allCategories)));
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${coreConst.url.localHost}/createRecipe`, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${coreConst.url.localHost}/updateRecipe` + recipe.uid, recipe);
  }

  deleteRecipe(recipe: Recipe): Observable<void> {
    return this.http.delete<void>(`${coreConst.url.localHost}/deleteRecipe` + recipe.uid);
  }

  scrapedRecipe(url: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${coreConst.url.localHost}/scrapeRecipe?url=${url}`);
  }
}
