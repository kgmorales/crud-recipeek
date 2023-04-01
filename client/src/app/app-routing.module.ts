import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('app/features/recipe-grid/recipe-grid.module').then(m => m.RecipesModule),
  },
  { path: 'blog', loadChildren: () => import('@blog/blog.module').then(m => m.BlogModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
// import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
// import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
//   { path: 'tutorials', component: TutorialsListComponent },
//   { path: 'tutorials/:id', component: TutorialDetailsComponent },
//   { path: 'add', component: AddTutorialComponent },
//   {
//     path: 'blog',
//     loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
//   },
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: '/blog',
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
