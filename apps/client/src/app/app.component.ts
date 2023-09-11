import { Component } from '@angular/core';
import { LoadingService } from '../app/core/services';

@Component({
  selector: 'la-root',
  template: `
    <div class="app">
      <la-side-nav />
      <div class="wrapper">
        <la-header />
        <div class="main-container">
          <router-outlet #page="outlet" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lamora';

  constructor(private loadingService: LoadingService) {}
}
