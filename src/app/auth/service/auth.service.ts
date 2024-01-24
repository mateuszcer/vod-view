import { Injectable } from '@angular/core';
import { AuthFlowType, AuthenticationResultType, CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { AppConfigService } from '../../shared/service/configuration.service';
import { AuthData, AuthResponse } from '../model/auth-data';
import { AuthDataProvider } from './auth-data.provider';
import { Router, UrlSegment } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private client = new CognitoIdentityProviderClient({ region: 'eu-north-1'});

    cachedUrl: UrlSegment[] | null = null;

    constructor(private configService: AppConfigService,
       private authDataProvider: AuthDataProvider,
       private router: Router) {}

  async signUp(firstName: string, lastName: string, email: string, password: string, birthdate: Date) {
    
    const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];
    const updatedUnixTimeStamp = Math.floor(new Date().getTime() / 1000).toString();

    const signUpParams = {
      ClientId: this.configService.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: firstName,
        },
        {
          Name: 'family_name',
          Value: lastName,
        },
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'birthdate',
          Value: formattedBirthdate,
        },
        {
          Name: 'updated_at',
          Value: updatedUnixTimeStamp,
        },
      ],
    };
    const command = new SignUpCommand(signUpParams);

    try{
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async confirmSignUp(email: string, confirmationCode: string) {
    const confirmSignUpParams = {
        ClientId: this.configService.COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: confirmationCode,
    };

    const command = new ConfirmSignUpCommand(confirmSignUpParams);

    try {
        return await this.client.send(command);
    } catch (error) {
        console.error('Error confirming signup:', error);
        throw error;
    }
  }

  async login(email: string, password: string) {
    const input = { 
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: { 
        "USERNAME": email,
        "PASSWORD": password,
      },
      ClientId: this.configService.COGNITO_CLIENT_ID,
    };
    const command = new InitiateAuthCommand(input);

    try {
      const authResponse: AuthResponse = await this.client.send(command);
      const authData: AuthData | undefined = authResponse.AuthenticationResult;
      if(!authData) {
        throw new Error('No authentication data returned');
      }

      this.authDataProvider.saveAuthData(authData);
      if(this.cachedUrl) { 
        this.router.navigate(this.cachedUrl.map(segment => segment.path));
        this.cachedUrl = null;
        return;
      }
      this.router.navigate(['/videos']);
    } catch(error) {
      console.error('Error logging in:', error);
      throw error;
    }

  }

  isLogged(): boolean {
    return this.authDataProvider.getAuthData() !== undefined;
  }

  logout(): void {
    this.authDataProvider.clearAuthData();
    this.router.navigate(['auth/login']);
  }

  
}
