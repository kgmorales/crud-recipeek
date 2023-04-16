import { Component } from '@angular/core';

import { LoadingService } from '@core/services';

import { HomeService } from './home.service';

@Component({
  selector: 'la-home',
  template: `
    <ng-container *ngIf="homePreview$ | async as previews">
      <!-- <div class=" main-header anim">Recipes</div> -->
      <div *ngIf="previews" class="main-blogs">
        <app-preview-row title="Favorites" [previews]="previews" />
        <app-preview-row title="Dinner" [previews]="previews" />
        <app-preview-row title="Desserts" [previews]="previews" />
      </div>
    </ng-container>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading$ = this.loadingService.isLoading$;
  homePreview$ = this.homeService.homePreviews$;

  constructor(private loadingService: LoadingService, private homeService: HomeService) {}
}
