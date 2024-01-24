import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDataProvider } from '../service/auth-data.provider';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authDataProvider: AuthDataProvider) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    const authToken = this.authDataProvider.getAuthData()?.AccessToken; 
    
    if (!authToken) {
      return next.handle(request);
    }
    const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` } 
    });

    return next.handle(authRequest);
  }

}
