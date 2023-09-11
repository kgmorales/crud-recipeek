import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesStateService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class SearchNavigationService {
  constructor(
    private router: Router,
    private recipeStateService: RecipesStateService
  ) {
    this.recipeStateService.filter$.subscribe((filter) => {
      if (filter.search.trim() !== '') {
        this.router.navigate([{ outlets: { searchResults: ['search'] } }], {
          skipLocationChange: true,
        });
      } else {
        this.router.navigate([{ outlets: { searchResults: null } }], {
          skipLocationChange: true,
        });
      }
    });
  }
}
