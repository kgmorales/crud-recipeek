import { Component } from '@angular/core';
import { RecipesStateService } from '@core/services';
import { RecipeGridService } from 'app/features/recipe-grid/recipe-grid.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  _recipes$ = this.recipeGridService.favoriteRecipes$;
  // scrapedRecipe$ = this.recipesStateService.scrapedRecipe$;

  searchText: string;

  constructor(
    // private recipesStateService: RecipesStateService,
    private recipeGridService: RecipeGridService
  ) {}
}
