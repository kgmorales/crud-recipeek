import { Component } from '@angular/core';

import { PaprikaService } from '@core/services';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  recipes$ = this.paprikaService.getAllRecipes();

  searchText: string;

  constructor(private paprikaService: PaprikaService) {}
}
