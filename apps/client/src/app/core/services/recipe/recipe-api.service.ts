import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

//? Core
import * as coreConst from '@core/constants';
import { Category, Recipe } from '@client/app/core/interfaces';
import { buildRecipesModel } from '@core/utils/service';
@Injectable({
  providedIn: 'root',
})
export class RecipesApiService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${coreConst.url.localHost}/allDBRecipes`)
      .pipe(map((allRecipes) => buildRecipesModel(allRecipes)));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${coreConst.url.localHost}/categories`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(
      `${coreConst.url.localHost}/createRecipe/`,
      recipe
    );
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(
      `${coreConst.url.localHost}/updateRecipe/${recipe.uid}`,
      recipe
    );
  }

  deleteRecipe(recipe: Recipe): Observable<void> {
    return this.http.delete<void>(
      `${coreConst.url.localHost}/deleteRecipe/${recipe.uid}`
    );
  }

  scrapedRecipe(url: string): Observable<Recipe> {
    return this.http.get<Recipe>(
      `${coreConst.url.localHost}/scrapeRecipe?url=${url}`
    );
  }

  paginatedRecipes(page: number = 1, limit: number = 10): Observable<Recipe[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<Recipe[]>(
      `${coreConst.url.localHost}/paginatedRecipes`,
      { params }
    );
  }
}
