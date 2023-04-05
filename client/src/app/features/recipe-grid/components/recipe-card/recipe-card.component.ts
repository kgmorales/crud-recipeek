import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/models';
import { ListComponent } from '@shared/components/list/list.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: 'recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor() {}

  ngOnInit(): void {}
}
