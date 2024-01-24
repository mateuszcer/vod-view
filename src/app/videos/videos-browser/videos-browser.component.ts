import { Component } from '@angular/core';
import { VideoService } from '../service/video.service';
import { VideoMetadata } from '../model/video-metadata.type';
import { CategoryName } from '../model/category-name.enum';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-videos-browser',
  templateUrl: './videos-browser.component.html',
  styleUrl: './videos-browser.component.scss'
})
export class VideosBrowserComponent {

  videosMetadata: { [key: string]: VideoMetadata[] } = {};
  newestVideosMetadata: VideoMetadata[];
  videosLoaded: boolean = false;

  categoriesToFetch = [CategoryName.Fantasy, CategoryName.Comedy, CategoryName.Documentary, CategoryName.Drama]

  constructor(private videoService: VideoService) { }
  
  ngOnInit() {
    this.fetchVideos().subscribe((val: boolean) => {
      this.videosLoaded = val;
    });
  }
  
  fetchVideos(): Observable<boolean> {
    const observables: Observable<any>[] = [];
  
    observables.push(
      this.videoService.getVideos(10, 1).pipe(
        tap(videosMetadata => {
          this.newestVideosMetadata = videosMetadata;
        })
      )
    );
  
    this.categoriesToFetch.forEach(category => {
      observables.push(
        this.videoService.getVideosCategorized(10, 1, category).pipe(
          tap(videosMetadata => {
            this.videosMetadata[category] = videosMetadata;
          })
        )
      );
    });
  
    return forkJoin(observables).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
