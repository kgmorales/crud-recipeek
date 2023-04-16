//? NG
import { NgClass, NgFor, NgIf } from '@angular/common';
//? CORE
import { Component, Input } from '@angular/core';
import { Recipe } from '@core/models';

//? 3RD PARTY

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  styleUrls: ['./list.component.scss'],
  template: `
    <div *ngIf="ingredients">
      <ul class="list">
        <li
          [attr.data-selected]="false"
          (click)="highlightStatus[i] = !highlightStatus[i]"
          class="list-item"
          [class.is-checked]="highlightStatus[i]"
          *ngFor="let ingredient of ingredients; let i = index">
          <div class="list-item-check">
            <i class="icon ion-checkmark-round"></i>
          </div>
          <div class="list-item-title">
            <span class="list-item-title-strikethrough"></span>
            {{ ingredient }}
          </div>
        </li>
        <!-- <li class="list-item is-last">
          <div class="list-item-check">
            <i class="icon ion-checkmark-round"></i>
          </div>
          <div class="list-item-title">
            <span class="list-item-title-strikethrough"></span>
            Skissa upp kundresa
          </div>
        </li> -->
      </ul>
    </div>
  `,
})
export class ListComponent {
  highlightStatus: Array<boolean> = [];
  list: unknown;
  @Input() ingredients: Recipe['ingredientsList'];

  // toggleSelected($event: Event) {
  //   this.select;
  // }
}
