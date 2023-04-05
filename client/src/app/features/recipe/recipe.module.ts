import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './recipe-routing.module';

import { RecipeComponent } from './recipe.component';

@NgModule({
  declarations: [RecipeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class RecipeModule {}
