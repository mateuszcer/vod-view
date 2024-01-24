import { Injectable } from "@angular/core";
import { AuthData } from "../model/auth-data";

@Injectable({
    providedIn: 'root',
})
export class AuthDataProvider {
    private authData: AuthData | undefined;
    private authDataKey = 'authData';

    constructor() { }

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