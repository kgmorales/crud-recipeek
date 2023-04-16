import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { Preview } from '@features/home/models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'la-preview-row',
  template: `
    <h2>{{ title }}</h2>
    <div class="preview-row">
      <la-recipe-preview *ngFor="let preview of previews" [preview]="preview" />
    </div>
  `,
  styleUrls: ['./preview-row.component.scss'],
  standalone: true,
  imports: [RecipePreviewComponent, NgIf, NgFor],
})
export class PreviewRowComponent {
  @Input() previews: Preview[];
  @Input() title = '';
}
