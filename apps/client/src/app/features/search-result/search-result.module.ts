import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultRoutingModule } from './search-result-routing.module';
import {
  ListComponent,
  RecipePreviewComponent,
  PreviewComponent,
  PreviewRowComponent,
} from '@shared/components';
import { SearchResultComponent } from './search-result.component';
import { SearchResultService } from './search-result.service';

@NgModule({
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    ListComponent,
    RecipePreviewComponent,
    PreviewComponent,
    PreviewRowComponent,
  ],
  exports: [],
  declarations: [SearchResultComponent],
  providers: [SearchResultService],
})
export class SearchResultModule {}
