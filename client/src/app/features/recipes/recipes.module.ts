import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCommonModule } from '@angular/material/core';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { SearchPipe } from '@shared/pipes';

import { RecipeService } from './recipe.service';
import { ListComponent } from "../../shared/components/list.component";

@NgModule({
    declarations: [SearchRecipeComponent, RecipeCardComponent],
    providers: [RecipeService],
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
        ListComponent
    ]
})
export class RecipesModule {}
