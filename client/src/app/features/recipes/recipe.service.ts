import { Injectable } from '@angular/core';
import { PaprikaService } from '@core/services';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes$ = this.paprikaService.getAllRecipes();

  constructor(private paprikaService: PaprikaService) {}
}
