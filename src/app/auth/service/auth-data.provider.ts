import { Injectable } from "@angular/core";
import { AuthData } from "../model/auth-data";
import { CognitoGroup } from "../model/cognito-group.enum";

@Injectable({
    providedIn: 'root',
})
export class AuthDataProvider {
    private authData: AuthData | undefined;
    private authDataKey = 'authData';
    private cognitoGroups: CognitoGroup[] | undefined;

    constructor() { }

    addCognitoGroups(groups: CognitoGroup[]): void {
        if (!this.cognitoGroups) {
            this.cognitoGroups = [];
        }
        this.cognitoGroups.push(...groups);
        localStorage.setItem('cognitoGroups', JSON.stringify(this.cognitoGroups));
    }

    getCognitoGroups(): CognitoGroup[] | undefined {
        if (this.cognitoGroups) {
            return this.cognitoGroups;
        }

        const storedCognitoGroups = localStorage.getItem('cognitoGroups');
        if (storedCognitoGroups) {
            this.cognitoGroups = JSON.parse(storedCognitoGroups);
            return this.cognitoGroups;
        }
        return undefined;
    }

    clearCognitoGroups(): void {
        localStorage.removeItem('cognitoGroups');
        this.cognitoGroups = undefined;
    }

    saveAuthData(authData: AuthData): void {
        localStorage.setItem(this.authDataKey, JSON.stringify(authData));
        this.authData = authData;
    }

    getAuthData(): AuthData | undefined {
        if (this.authData) {
            return this.authData;
        }

        const storedAuthData = localStorage.getItem(this.authDataKey);
        if (storedAuthData) {
            this.authData = JSON.parse(storedAuthData);
            return this.authData;
        }

        return undefined;
    }

    clearAuthData(): void {
        localStorage.removeItem(this.authDataKey);
        this.authData = undefined;
    }

}