import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

import {
  ListComponent,
  RecipePreviewComponent,
  PreviewComponent,
  PreviewRowComponent,
} from '@shared/components';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RecipePreviewComponent,
    PreviewRowComponent,
    PreviewComponent,
    ListComponent,
  ],
})
export class HomeModule {}
