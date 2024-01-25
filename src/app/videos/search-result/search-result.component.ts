import { Component } from '@angular/core';
import { VideoMetadata } from '../model/video-metadata.type';
import { Subscription } from 'rxjs';
import { VideoSearchService } from '../service/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  searchResults: VideoMetadata[] = [];
  private subscription: Subscription;

  constructor(private videoSearchService: VideoSearchService) {
    this.subscription = this.videoSearchService.searchResults$.subscribe(
      (results) => {
        this.searchResults = results;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
