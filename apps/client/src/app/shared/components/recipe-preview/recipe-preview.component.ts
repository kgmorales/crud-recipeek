import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { Preview } from '@features/home/models';
@Component({
  selector: 'la-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss'],
  imports: [NgFor],
  standalone: true,
})
export class RecipePreviewComponent {
  @Input() preview: Preview;
}
