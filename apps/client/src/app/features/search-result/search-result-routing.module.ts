import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

const routes: Routes = [{ path: '', component: SearchResultComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SearchResultRoutingModule {}
