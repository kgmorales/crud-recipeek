import { Component } from '@angular/core';

import { filter, take } from 'rxjs';

import { LoadingService } from '@core/services';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="favorites$ | async as favorites">
      <div class=" main-header anim">Recipes</div>
      <div class="main-blogs">
        <div class="row">
          <app-recipe-preview *ngFor="let favorite of favorites" [preview]="favorite" />
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categories$ = this.homeService.categories$;
  loading$ = this.loadingService.isLoading$;
  favorites$ = this.homeService.favoritesPreview$;

  constructor(private loadingService: LoadingService, private homeService: HomeService) {}
}
