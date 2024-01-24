import { Component, Input } from '@angular/core';
import { VideoMetadata } from '../model/video-metadata.type';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {

  
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  @Input() videosMetadata: VideoMetadata[];


}
