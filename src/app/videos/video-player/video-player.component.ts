import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../service/video.service';
import { VideoWatchResponse } from '../model/response/video-watch.response';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  videoWatchData: VideoWatchResponse;
  isPlaying = false;
  progressPercent = 0;


  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const videoId = params['v'];
    if (videoId) {
      this.videoService.watchVideo(videoId).subscribe(res => {
        this.videoWatchData = res;
      });
    }
  });
  }
}
