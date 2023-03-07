import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCommonModule } from '@angular/material/core';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SearchComponent } from './components/search-recipe/search-recipe.component';
import { SearchPipe } from '@shared/pipes';

@NgModule({
  declarations: [SearchComponent],
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
  ],
})
export class RecipesModule {}
