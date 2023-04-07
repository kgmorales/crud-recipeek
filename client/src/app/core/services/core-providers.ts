//* Import Core Services
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { SpHttpErrorInterceptor } from './interceptors/sp-http-error.interceptor';
// import { SpHttpLogInterceptor } from './interceptors/sp-http-log.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
// import { AuthHttpInterceptor } from '@auth0/auth0-angular';
// import { SpHttpPhoneUpdateInterceptor } from './interceptors/sp-http-phone-update.interceptor';

export const providers: Provider[] = [
  // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: SpHttpErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: SpHttpLogInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: SpHttpPhoneUpdateInterceptor, multi: true },
];
