import { Component } from '@angular/core';
import { RecipeService } from '@recipes/recipe.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  _recipes$ = this.recipeService.recipes$;
  searchText: string;

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipes$.subscribe(data => console.log(data));
  }
}
