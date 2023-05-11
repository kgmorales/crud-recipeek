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
        name="search"
        [(ngModel)]="searchTerm"
        #search="ngModel"
      />
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  recipes$: Observable<Recipe[]>;

  constructor(private recipesStateService: RecipesStateService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipesStateService.recipes$;
  }

  onSearchChange(): void {
    this.recipesStateService.updateFilter({
      search: this.searchTerm,
      category: { isFastCookTime: false, isFavorite: false },
    });
  }
}
