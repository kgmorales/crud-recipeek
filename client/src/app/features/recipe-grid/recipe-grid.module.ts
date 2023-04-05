import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCommonModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipe-grid-routing.module';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { ScrapeRecipeFormComponent } from './components/recipe-card/scrape-recipe/scrape-recipe.component';

import { SearchPipe } from '@shared/pipes';

import { RecipeGridService } from './recipe-grid.service';
import { ListComponent } from '../../shared/components/list/list.component';

@NgModule({
  declarations: [SearchRecipeComponent, RecipeCardComponent, ScrapeRecipeFormComponent],
  providers: [RecipeGridService],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatCommonModule,
    SearchPipe,
    ListComponent,
    ReactiveFormsModule,
  ],
})
export class RecipesModule {}
