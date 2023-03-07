import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { Recipes, Categories, Recipe, Option } from '@core/models';
import { EzCache } from 'ez-state';

const baseUrl = 'http://localhost:8080';
// const showWifi = 'http://192.168.1.20:8080';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apis: { [key: string]: Observable<Option[]> } = {};
  private recipesCache = new EzCache<Recipe[]>();

  // recipes$ = this.recipesCache.value$;

  constructor(private http: HttpClient) {}

  load(): void {

  }

  get categories$(): Observable<Option[]> {
    return (
      this.apis['categories$'] || this.create('categories$', this.http.get<Option[]>('categories'))
    );
  }

  get recipes$(): Observable<Option[]> {
    return this.apis['recipes$'] || this.create('recipes$', this.http.get<Option[]>('recipes'));
  }

  getAllRecipes(): Observable<Recipes> {
    return this.http.get<Recipes>(`${baseUrl}/recipes`);
  }

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${baseUrl}/categories`);
  }

  create(property: string, source$: Observable<Option[]>) {
    const cache = new EzCache<Option[]>();
    cache.load(source$);
    return (this.apis[property] = cache.value$);
  }
}
