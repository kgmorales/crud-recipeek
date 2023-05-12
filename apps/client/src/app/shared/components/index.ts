//* List Component
import { ListComponent } from './list/list.component';

//* Recipe Preview
import { PreviewComponent } from './preview/preview.component';
import { PreviewRowComponent } from './preview-row/preview-row.component';
import { RecipePreviewComponent } from './recipe-preview/recipe-preview.component';

export const components = [
  ListComponent,
  PreviewComponent,
  PreviewRowComponent,
  RecipePreviewComponent,
];

//* Export Components
export * from './list/list.component';
export * from './preview/preview.component';
export * from './preview-row/preview-row.component';
export * from './recipe-preview/recipe-preview.component';
