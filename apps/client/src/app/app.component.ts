import { Component } from '@angular/core';
import { LoadingService } from '../app/core/services';

@Component({
  selector: 'la-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lamora';

  constructor(private loadingService: LoadingService) {}
}
