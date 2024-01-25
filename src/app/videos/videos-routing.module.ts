import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideosBrowserComponent } from './videos-browser/videos-browser.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CreatorGuardService } from '../auth/guard/creator-guard.service';
import { SearchResultComponent } from './search-result/search-result.component';

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
component: VideoPlayerComponent},
{path: 'search',
component: SearchResultComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
