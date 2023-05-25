import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipe-grid-routing.module';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { ListComponent } from '@shared/components';
import { SearchPipe } from '@shared/pipes';

import { RecipeGridService } from './recipe-grid.service';

@NgModule({
  declarations: [SearchRecipeComponent, RecipeCardComponent],
  providers: [RecipeGridService],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    SearchPipe,
    ListComponent,
    ReactiveFormsModule,
  ],
})
export class RecipesModule {}
