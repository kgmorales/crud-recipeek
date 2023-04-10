import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '@core/services';
@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(req: HttpRequest<Request>, next: HttpHandler) {
    this.loading.show();
    return next.handle(req).pipe(
      delay(500),
      finalize(() => this.loading.hide())
    );
  }
}
