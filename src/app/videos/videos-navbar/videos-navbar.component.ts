import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { VideoMetadata } from '../model/video-metadata.type';
import { VideoSearchService } from '../service/search.service';

@Component({
  selector: 'app-videos-navbar',
  templateUrl: './videos-navbar.component.html',
  styleUrl: './videos-navbar.component.scss',
})
export class VideosNavbarComponent {

  items: {label: string, routerLink: string, icon?: string}[];
  searchToggled: boolean = false;
  searchResults: VideoMetadata[] = [];
  searchTerm$ = new Subject<string>();
  pageNumber: number = 1;
  private destroy$ = new Subject<void>();
  dropdownVisible: boolean = false;

  constructor(private authService: AuthService, private videoSearchService: VideoSearchService) { }

  ngOnInit() {
    this.setupSearch();
    this.items = [
      {label: 'Home', routerLink: '/videos'},]
      if(this.authService.isCreator()) {
        this.items.push({label: 'Upload', routerLink: '/videos/upload'});
      }
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleSearch() {
    this.searchToggled = !this.searchToggled;
  }

  logout() {
    this.authService.logout();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((term) => {
        this.videoSearchService.searchVideos(term, this.pageNumber);
      });
  }

  onSearchInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(inputValue);
  }
}
