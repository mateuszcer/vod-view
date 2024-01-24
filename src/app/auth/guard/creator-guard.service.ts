import { Injectable } from "@angular/core";
import { CognitoGroup } from "../model/cognito-group.enum";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: 'root',
  })
export class CreatorGuardService {

    constructor(private authService: AuthService) { }
    
    canActivate(): boolean {
        return this.authService.isCreator();
    }
} 