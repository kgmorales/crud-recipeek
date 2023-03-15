import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

//? Core
import * as core from '@core/constants';
import { AllRecipes } from '@core/models';
import { Category, Recipe } from '../.././../../../../shared/types';
@Injectable({
  providedIn: 'root',
})
export class PaprikaService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<AllRecipes>(`${core.url.localHost}/recipes`).pipe(
      map(allRecipes => {
        return Object.values(allRecipes)[0];
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${core.url.localHost}/categories`);
  }
}
