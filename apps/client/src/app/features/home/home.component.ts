import { Component } from '@angular/core';

import { LoadingService, RecipesStateService } from '@core/services';

import { HomeService } from './home.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'la-home',
  template: `
    <ng-container *ngIf="homePreview$ | async as previews">
      <!-- <div class=" main-header anim">Recipes</div> -->
      <div *ngIf="previews" class="main-blogs">
        <la-preview-row title="Favorites" [previews]="previews" />
        <la-preview-row title="Dinner" [previews]="previews" />
        <la-preview-row title="Desserts" [previews]="previews" />
      </div>
    </ng-container>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showSearchResults: boolean;
  loading$ = this.loadingService.isLoading$;
  homePreview$ = this.homeService.homePreviews$.pipe(debounceTime(200));

  constructor(
    private loadingService: LoadingService,
    private homeService: HomeService,
    private recipeStateService: RecipesStateService
  ) {
    // this.recipeStateService.filter$.subscribe((filter) => {
    //   if (filter.search.trim().length > 0) {
    //     this.showSearchResults = true;
    //   } else {
    //     this.showSearchResults = false;
    //   }
    // });

    this.recipeStateService.filter$.subscribe((x) => console.log(x));
  }
}
