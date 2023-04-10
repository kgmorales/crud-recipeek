import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipesStateService } from '@core/services';
import { take } from 'rxjs';

@Component({
  selector: 'app-scrape-form',
  templateUrl: './scrape-recipe.component.html',
})
export class ScrapeRecipeFormComponent {
  form = {
    url: '',
  };

  constructor(private recipesStateService: RecipesStateService) {}

  onReset(form: NgForm): void {
    form.reset();
  }

  onSubmit() {
    // this.recipesStateService
    //   .getScrapedRecipe(this.form.url)
    //   .pipe(take(1))
    //   .subscribe(recipe => this.recipeService.storeScrapedRecipe(recipe));
  }
}
