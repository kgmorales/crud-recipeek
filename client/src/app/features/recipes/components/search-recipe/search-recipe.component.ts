import { Component } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { BehaviorSubject, Observable, take } from 'rxjs';

import { Recipe, Tutorial } from '@core/models';
import { RecipeService } from '@core/services';
// import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css'],
})
export class SearchComponent {
  // recipes$ = this.paprikaService.getAllRecipes();
  // categories$ = this.paprikaService.getCategories();

  searchText: string;

  constructor(
    // private tutorialService: TutorialService,
    private paprikaService: RecipeService
  ) {
    this.paprikaService.recipes$.subscribe(x => console.log('recipe', x));
    // this.recipes$.pipe(take(1)).subscribe(recipes => console.log(recipes));
  }

  // saveTutorial(): void {
  //   const data = {
  //     title: this.tutorial.title,
  //     description: this.tutorial.description,
  //   };

  // this.tutorialService.create(data)
  //   .subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.submitted = true;
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  // newTutorial(): void {
  //   this.submitted = false;
  //   this.tutorial = {
  //     title: '',
  //     description: '',
  //     published: false,
  //   };
  // }
}
