import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [BlogComponent, PostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
  ],
})
export class BlogModule {}
