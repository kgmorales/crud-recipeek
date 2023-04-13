import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { Preview } from 'app/features/home/models';
@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss'],
  imports: [NgFor],
  standalone: true,
})
export class RecipePreviewComponent {
  @Input() preview: Preview;
  constructor() {}
}
