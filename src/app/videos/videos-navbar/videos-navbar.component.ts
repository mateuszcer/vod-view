import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-videos-navbar',
  templateUrl: './videos-navbar.component.html',
  styleUrl: './videos-navbar.component.scss',
})
export class VideosNavbarComponent {

  items: {label: string, routerLink: string, icon?: string}[];
  searchToggled: boolean = false;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    
    this.items = [
      {label: 'Home', routerLink: '/videos'},]
      if(this.authService.isCreator()) {
        this.items.push({label: 'Upload', routerLink: '/videos/upload'});
      }
  }

  toggleSearch() {
    this.searchToggled = !this.searchToggled;
  }

  logout() {
    this.authService.logout();
  }
}
