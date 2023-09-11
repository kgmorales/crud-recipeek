import { Component } from '@angular/core';

import { WellKnownRoutes } from '@core/enums';
@Component({
  selector: 'la-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  route = WellKnownRoutes;
  isOpen = false;


  open(): void {
    this.isOpen = !this.isOpen;
  }
}
