import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { BlogPost, BlogPostMeta } from '../types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(protected route: ActivatedRoute) {}

  protected slug: Observable<string>;
  public postData$: Observable<any>;

  ngOnInit() {
    this.postData$ = this.route.data.pipe(
      map((data: any) => {
        return data.post;
      })
    );
  }
}
