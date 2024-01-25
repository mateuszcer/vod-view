import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  readonly API_URL: string = 'https://qzzkxpt4gf.execute-api.eu-north-1.amazonaws.com/stage1';
  // readonly API_URL: string = 'http://localhost:3000';
  readonly COGNITO_CLIENT_ID: string = '4afocdrrddmrpc9e84t68khh5';
}
