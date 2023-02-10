import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

const baseUrl = 'http://localhost:8080/getRecipes';

@Injectable({
  providedIn: 'root',
})
export class PaprikaService {
  constructor(private http: HttpClient) {
    this.getAll()
      .pipe(take(1))
      .subscribe((recipes) => console.log(recipes));
  }

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${baseUrl}/getRecipes`);
  }
}
