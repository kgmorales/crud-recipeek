import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { Preview } from 'app/features/home/models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-preview-row',
  template: `
    <h2>{{ title }}</h2>
    <div class="preview-row">
      <app-recipe-preview *ngFor="let preview of previews" [preview]="preview" />
    </div>
  `,
  styleUrls: ['./preview-row.component.scss'],
  standalone: true,
  imports: [RecipePreviewComponent, NgIf, NgFor],
})
export class PreviewRowComponent implements OnChanges {
  @Input() previews: Preview[];
  @Input() title = '';
  constructor() {}

  ngOnChanges(): void {}
}
