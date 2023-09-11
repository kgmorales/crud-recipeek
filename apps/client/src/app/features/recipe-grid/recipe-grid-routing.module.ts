import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';

const routes: Routes = [{ path: '', component: SearchRecipeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
