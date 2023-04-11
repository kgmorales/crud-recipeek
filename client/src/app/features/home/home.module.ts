import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { RecipePreviewComponent } from '@shared/components/recipe-preview/recipe-preview.component';
import { PreviewComponent } from '@shared/components/preview/preview.component';
import { ListComponent } from '@shared/components/list/list.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RecipePreviewComponent,
    PreviewComponent,
    ListComponent,
  ],
})
export class HomeModule {}
