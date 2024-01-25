import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDataProvider } from '../service/auth-data.provider';
import { AppConfigService } from '../../shared/service/configuration.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authDataProvider: AuthDataProvider, private configService: AppConfigService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiBaseUrl = this.configService.API_URL;
    const authToken = this.authDataProvider.getAuthData()?.AccessToken; 
    
    if (!authToken || !request.url.startsWith(apiBaseUrl)) {
      return next.handle(request);
    }
    const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` } 
    });

    return next.handle(authRequest);
  }

}
