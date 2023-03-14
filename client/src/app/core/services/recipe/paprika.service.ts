import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

//? Core
import * as core from '@core/constants';
import { AllRecipes, Recipe } from '@core/models';
@Injectable({
  providedIn: 'root',
})
export class PaprikaService {
  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<AllRecipes>(`${core.url.localHost}/recipes`).pipe(
      map(allRecipes => {
        return Object.values(allRecipes)[0];
      })
    );
  }
}
