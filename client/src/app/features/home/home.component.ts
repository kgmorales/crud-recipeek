import { Component } from '@angular/core';

import { filter, take } from 'rxjs';

import { LoadingService } from '@core/services';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="homePreview$ | async as previews">
      <div class=" main-header anim">Recipes</div>
      <div class="main-blogs">
        <div class="row">
          <app-recipe-preview *ngFor="let preview of previews" [preview]="preview" />
        </div>
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
