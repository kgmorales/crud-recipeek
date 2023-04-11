import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/models';

@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss'],
  standalone: true,
})
export class RecipePreviewComponent implements OnInit {
  @Input() preview: Partial<Recipe>;
  constructor() {}

  ngOnInit() {}
}
