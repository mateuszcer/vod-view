import { Component, Input } from '@angular/core';
import { VideoMetadata } from '../model/video-metadata.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {

  @Input() videoMetadata: VideoMetadata;

  constructor(private router: Router) { }


  goToVideo() {
    this.router.navigate(['videos/watch'], { queryParams: { v: this.videoMetadata.videoId } });
  }

}
