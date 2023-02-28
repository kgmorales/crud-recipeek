import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { AllRecipes, Recipe } from '@core/models';

const baseUrl = 'http://192.168.1.20:8080';

@Injectable({
  providedIn: 'root',
})
export class PaprikaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Recipe[]> {
    return this.http.get<AllRecipes>(`${baseUrl}/getRecipes`).pipe(
      map(allRecipes => {
        return Object.values(allRecipes)[0];
      })
    );
  }
}
