import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Recipe, Tutorial } from '@core/models';
import { PaprikaService } from '@core/services';
// import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  recipes$ = this.paprikaService.getAll();
  submitted = false;
  searchText: string;
  name = new FormControl('');
  category = new FormControl('');

  constructor(
    // private tutorialService: TutorialService,
    private paprikaService: PaprikaService
  ) {}

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
