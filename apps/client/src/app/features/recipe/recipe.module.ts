import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './recipe-routing.module';

import { RecipeComponent } from './recipe.component';
import { RecipeFullComponent } from './components/recipe-full/recipe-full.component';

@NgModule({
  declarations: [RecipeComponent, RecipeFullComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class RecipeModule {}
