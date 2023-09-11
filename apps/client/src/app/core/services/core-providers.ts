//* Import Core Services
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

export const providers: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
];
