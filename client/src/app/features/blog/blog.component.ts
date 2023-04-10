//* NG
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

//* Core
import { BlogPost, PostsData } from '@core/models';
import { ButterCMSService } from '@core/services';

//* 3rd Party
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  host: { class: 'full-width' },
})
export class BlogComponent implements OnInit {
  constructor(private butterCMSService: ButterCMSService) {}

  postsData: Observable<{
    data: BlogPost[];
    meta: {
      count: number;
      next_page: number | null;
      previous_page: number | null;
    };
  }>;

  pageSize = 10;

  ngOnInit() {
    this.getPosts(1, this.pageSize);
  }

  getPosts(page: number, pageSize: number) {
    this.postsData = this.butterCMSService.getPosts(page, pageSize);
  }

  onPageChanged(event: PageEvent) {
    this.getPosts(event.pageIndex + 1, event.pageSize);
  }
}
