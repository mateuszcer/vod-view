import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideosBrowserComponent } from './videos-browser/videos-browser.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CreatorGuardService } from '../auth/guard/creator-guard.service';

const routes: Routes = [{
  path: '',
  component: VideosComponent,
  children: [
    {path: '', 
  component: VideosBrowserComponent},
  {path: 'upload',
  canActivate: [(route: any, url: any[]) => inject(CreatorGuardService).canActivate()],
component: VideoUploadComponent},
{path: 'watch',
component: VideoPlayerComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
