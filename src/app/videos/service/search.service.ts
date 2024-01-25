import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoMetadata } from '../model/video-metadata.type';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root',
})
export class VideoSearchService {

    private searchResultsSubject = new BehaviorSubject<VideoMetadata[]>([]);
    searchResults$ = this.searchResultsSubject.asObservable();
    private cache: { [key: string]: VideoMetadata[] } = {};
  
    constructor(private videoService: VideoService) {}
  
    searchVideos(query: string, pageNumber: number): void {
      const cacheKey = this.getCacheKey(query, pageNumber);

      if (this.cache[cacheKey]) {
        this.searchResultsSubject.next(this.cache[cacheKey]);
      } else {
        this.videoService.searchVideos(query, pageNumber).subscribe((results) => {

          this.cache[cacheKey] = results;
          this.searchResultsSubject.next(results);
        });
      }
    }
  
    private getCacheKey(query: string, pageNumber: number): string {
      return `${query}_${pageNumber}`;
    }
}
