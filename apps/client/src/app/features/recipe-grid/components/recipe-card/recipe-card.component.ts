import { Component, Input } from '@angular/core';
import { Recipe } from '@client/app/core/interfaces';
// import { ListComponent } from '@shared/components/list/list.component';

@Component({
  selector: 'la-recipe-card',
  templateUrl: 'recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: Recipe;
}
