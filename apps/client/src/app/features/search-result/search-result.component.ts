import { Component, OnInit } from '@angular/core';
import { Observable, debounceTime } from 'rxjs';
import { Preview } from '@core/interfaces';

import { SearchResultService } from './search-result.service';

@Component({
  selector: 'la-search-result',
  template: `
    <div class="row">
      <div class="col-12">
        <ng-container *ngIf="searched$ | async as searched">
          <la-preview-row title="Search Results" [previews]="searched" />
        </ng-container>
      </div>
    </div>
  `,
})
export class SearchResultComponent implements OnInit {
  searched$: Observable<Preview[]>;

  constructor(private searchResultService: SearchResultService) {}

  ngOnInit(): void {
    this.searched$ = this.searchResultService.searchResult$.pipe(
      debounceTime(300)
    );
  }
}
