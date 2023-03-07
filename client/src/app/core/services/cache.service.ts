// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// import { EzCache } from 'ez-state';
// import { Option } from '@core/models';

// @Injectable({
//   providedIn: 'root',
// })
// export class CacheService {
//   private cache: { [key: string]: Observable<Option[]> } = {};

//   constructor() {}

//   get titles$(): Observable<Option[]> {
//     return this.observables.titles$ || this.create('titles$', this.http.get<Option[]>('titles'));
//   }

//   private create(property: string, source$: Observable<Option[]>) {
//     const cache = new EzCache<Option[]>();
//     cache.load(source$);
//     return (this.observables[property] = cache.value$);
//   }
// }
