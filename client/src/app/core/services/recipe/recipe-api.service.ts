import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';

//? Core
import * as coreConst from '@core/constants';
import { AllRecipes, Category, Recipe } from '@core/models';
import * as coreUtils from '@core/utils';
@Injectable({
  providedIn: 'root',
})
export class RecipesApiService {
  // readonly recipeCacheSubject$ = new BehaviorSubject<RecipeCache>({} as RecipeCache);
  // readonly recipeCache$ = this.recipeCacheSubject$.asObservable();
  // readonly scrapedRecipeSubject$ = new ReplaySubject<Recipe>(1);
  // readonly allRecipesSubject$ = new ReplaySubject<Recipe[]>(1);

  // allRecipes$ = this.allRecipesSubject$.asObservable();
  // scrapedRecipe$ = this.scrapedRecipeSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<AllRecipes>(`${coreConst.url.localHost}/recipes`).pipe(
      map(allRecipes => {
        return Object.values(allRecipes)[0].map((recipe: Recipe) => {
          const directionsList = recipe.directions.split(/\r?\n/);
          const ingredientsList = recipe.ingredients.split(/\r?\n/);

          return { ...recipe, directionsList, ingredientsList };
        });
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${coreConst.url.localHost}/categories`);
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
  //   this.getAllRecipes();
  //   this.recipeCacheSubject$.subscribe(x => console.log(x));
  // }

  // getAllRecipes(): void {
  //   this.http
  //     .get<AllRecipes>(`${coreConst.url.localHost}/recipes`)
  //     .pipe(
  //       map(allRecipes => {
  //         return Object.values(allRecipes)[0].map((recipe: Recipe) => {
  //           const directionsList = recipe.directions.split(/\r?\n/);
  //           const ingredientsList = recipe.ingredients.split(/\r?\n/);

  //           return { ...recipe, directionsList, ingredientsList };
  //         });
  //       })
  //     )
  //     .subscribe(recipes => this.recipeCacheSubject$.next({ ...recipes }));
  // }

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${coreConst.url.localHost}/categories`);
  // }

  // getScrapedRecipe(url: string): Observable<Recipe> {
  //   return this.http.get<Recipe>(`${coreConst.url.localHost}/scrapeRecipe?url=${url}`);
  // }

  // storeScrapedRecipe(recipe: Recipe): void {
  //   this.scrapedRecipeSubject$.next(recipe);
  // }
}
