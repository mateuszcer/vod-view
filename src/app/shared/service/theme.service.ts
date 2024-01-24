import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'lara-dark-blue'; 

  getTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
  }
}
