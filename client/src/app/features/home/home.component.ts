import { Component } from '@angular/core';

import { HomeService } from './home.service';
import { LoadingService } from '@core/services';
import { filter, take } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // host: { class: 'd-flex' },
})
export class HomeComponent {
  categories$ = this.homeService.categories$;
  loading$ = this.loadingService.isLoading$;

  constructor(private homeService: HomeService, private loadingService: LoadingService) {}
}
