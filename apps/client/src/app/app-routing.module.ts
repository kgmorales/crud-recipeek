import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('../app/features/recipe/recipe.module').then(
        (m) => m.RecipeModule
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('../app/features/recipe-grid/recipe-grid.module').then(
        (m) => m.RecipesModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@features/search-result/search-result.module').then(
        (m) => m.SearchResultModule
      ),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('@features/blog/blog.module').then((m) => m.BlogModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
