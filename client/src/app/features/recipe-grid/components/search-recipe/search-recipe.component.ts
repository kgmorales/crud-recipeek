import { Component } from '@angular/core';
import { RecipeService } from '@core/services';
import { RecipeGridService } from 'app/features/recipe-grid/recipe-grid.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  _recipes$ = this.recipeGridService.recipes$;
  scrapedRecipe$ = this.recipeService.scrapedRecipe$;

  searchText: string;

  constructor(private recipeService: RecipeService, private recipeGridService: RecipeGridService) {}
}
