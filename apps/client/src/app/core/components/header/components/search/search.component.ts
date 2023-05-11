import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '@core/interfaces';
import { RecipesStateService } from '@core/services';

@Component({
  selector: 'la-search',
  template: `
    <div class="search-bar">
      <input
        type="text"
        class="form-control"
        placeholder="eg. Chicken..."
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange()"
        aria-label="eg. Chicken..."
        autofocus
      />
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm: string;

  constructor(private recipesStateService: RecipesStateService) {}

  /**
   * Search Function.
   * setTimout is used to delay (5 seconds) the search of typing for sending to retrieve results.
   */
  onSearchChange(): void {
    setTimeout(() => {
      this.recipesStateService.updateFilter({
        search: this.searchTerm,
        category: { isFastCookTime: false, isFavorite: false },
      });
    }, 2000);
  }
}
