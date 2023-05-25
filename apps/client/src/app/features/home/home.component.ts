import { Component } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preview } from '@client/app/core/interfaces';

import { LoadingService } from '@core/services';
import { HomeService } from './home.service';

interface HomeViewModel {
  previews: Preview[];
  titles: string[];
}

const titles = ['Favorites', 'Dinner', 'Breakfast', 'Desserts'];

@Component({
  selector: 'la-home',
  template: `
    <ng-container *ngIf="homeViewModel$ | async as vm">
      <div *ngIf="vm" class="main-blogs">
        <ng-container *ngFor="let previews of vm.previews; let i = index">
          <la-preview-row [title]="vm.titles[i]" [previews]="vm.previews" />
        </ng-container>
      </div>
    </ng-container>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  homeViewModel$: Observable<HomeViewModel>;

  constructor(
    private homeService: HomeService,
    private loadingService: LoadingService
  ) {
    this.homeViewModel$ = this.buildHomeVm();
  }

  buildHomeVm(): Observable<HomeViewModel> {
    return combineLatest([this.homeService.homePreviews$, of(titles)]).pipe(
      map(([previews, titles]) => ({
        previews,
        titles,
      }))
    );
  }
}
