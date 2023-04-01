import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '@core/services';
import { take } from 'rxjs';

@Component({
  selector: 'app-scrape-form',
  templateUrl: './scrape-recipe.component.html',
})
export class ScrapeRecipeFormComponent {
  form = {
    url: '',
  };
  constructor(private recipeService: RecipeService) {}

  onReset(form: NgForm): void {
    form.reset();
  }

  onSubmit() {
    this.recipeService
      .getScrapedRecipe(this.form.url)
      .pipe(take(1))
      .subscribe(recipe => console.log(recipe));
  }
}
