import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { AllRecipes, Recipe } from '@core/models';

const baseUrl = 'http://localhost:8080';
// const showWifi = 'http://192.168.1.20:8080';

@Injectable({
  providedIn: 'root',
})
export class PaprikaService {
  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<AllRecipes>(`${baseUrl}/recipes`).pipe(
      map(allRecipes => {
        return Object.values(allRecipes)[0];
      })
    );
  }
}
