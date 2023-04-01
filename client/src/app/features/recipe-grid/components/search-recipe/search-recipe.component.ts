import { Component } from '@angular/core';
import { RecipeGridService } from 'app/features/recipe-grid/recipe-grid.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  _recipes$ = this.recipeGridService.recipes$;
  searchText: string;

  constructor(private recipeGridService: RecipeGridService) {}
}
