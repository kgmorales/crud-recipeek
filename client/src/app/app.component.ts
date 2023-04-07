import { Component } from '@angular/core';
import { LoadingService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lamora';

  constructor(private loadingService: LoadingService) {}
}
