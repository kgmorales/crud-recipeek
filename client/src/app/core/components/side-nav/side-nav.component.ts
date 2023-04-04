import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isOpen = false;
  constructor() {}

  ngOnInit() { }

  open():void {
    this.isOpen = !this.isOpen;
  }
}
