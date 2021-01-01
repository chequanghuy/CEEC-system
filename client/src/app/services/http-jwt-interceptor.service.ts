import { Injectable, Injector } from '@angular/core';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpJwtInterceptorService {
  constructor(private injector: Injector) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  intercept(req, next) {
    // const authService = this.injector.get(AuthService);
    // const tokenizedReq = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${authService.getToken()}`
    //   }
    // });
    // return next.handle(tokenizedReq);
  }
}
