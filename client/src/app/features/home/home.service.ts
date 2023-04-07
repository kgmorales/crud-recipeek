import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { Recipe } from '@core/models';
import { RecipesStateService } from '@core/services/';

@Injectable({ providedIn: 'root' })
export class HomeService {
  categories$ = this.recipesStateService.categories$;
  constructor(private recipesStateService: RecipesStateService) {}
}
