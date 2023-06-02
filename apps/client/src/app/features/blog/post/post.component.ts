// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, map } from 'rxjs';

// //* Core
// import { BlogPost, BlogPostMeta } from '@client/app/core/interfaces';

// @Component({
//   selector: 'la-post',
//   templateUrl: './post.component.html',
//   styleUrls: ['./post.component.scss'],
// })
// export class PostComponent implements OnInit {
//   constructor(protected route: ActivatedRoute) {}

//   protected slug: Observable<string>;
//   public postData$: Observable<any>;

//   ngOnInit() {
//     this.postData$ = this.route.data.pipe(
//       map((data: any) => {
//         return data.post;
//       })
//     );
//   }
// }
