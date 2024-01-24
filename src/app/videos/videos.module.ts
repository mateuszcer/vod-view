import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos/videos.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoListComponent } from './video-list/video-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { VideosBrowserComponent } from './videos-browser/videos-browser.component';
import { VideoService } from './service/video.service';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideosNavbarComponent } from './videos-navbar/videos-navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    VideosComponent,
    VideoCardComponent,
    VideoListComponent,
    VideosBrowserComponent,
    VideoUploadComponent,
    VideoPlayerComponent,
    VideosNavbarComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    CarouselModule,
    TagModule,
    FileUploadModule,
    DividerModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    ProgressBarModule,
    MultiSelectModule,
    MessagesModule,
    ProgressSpinnerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MenubarModule,
  ],
  providers: [VideoService]
})
export class VideosModule { }
