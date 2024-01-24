import { Component } from '@angular/core';
import { VideoMetadata } from '../model/video-metadata.type';
import { VideoUploadRequest } from '../model/request/video-upload.request';
import { VideoService } from '../service/video.service';
import { VideoUploadResponse } from '../model/response/video-upload.response';
import { CategoryName } from '../model/category-name.enum';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.scss'
})
export class VideoUploadComponent {

  uploadedVideo: File;
  uploadedThumbnail: File;
  progress: number;
  uploaded: boolean = false;
  uploadStarted: boolean = false;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) { }

  categories!: {name: string}[];
  successMessages!: any[];
  errorMessages!: any[];
  erorr: string = '';

  ngOnInit() {
    this.categories = Object.values(CategoryName).map((name: string) => ({ name }));
    this.successMessages = [{ severity: 'success', summary: 'Success', detail: 'File uploaded succesfuly' }];
    this.errorMessages = [{ severity: 'error', summary: 'Error', detail: 'File upload failed' }];
  }

  selectedCategories: {name: string}[] = [];

  videoMetadata: VideoUploadRequest = {
    fileName: '',
    title: '',
    description: '',
    categories: [],
    length: 0,
    productionYear: 0,
    thumbnailFilename: ''
  };


  onVideoUpload(event: any) {
    this.uploadedVideo = event.files && event.files.length > 0 ? event.files[0] : null;

    if(this.uploadedVideo) {
      this.videoMetadata.fileName = this.uploadedVideo.name;
      this.progress = 33;
    }
  }

  onThumbnailUpload(event: any) {
    this.uploadedThumbnail = event.files && event.files.length > 0 ? event.files[0] : null;
    if(this.uploadedThumbnail) {
      this.videoMetadata.thumbnailFilename = this.uploadedThumbnail.name;
      this.progress = 66;
    }
  }

  onSubmitMetadata() {
    this.videoMetadata.categories = this.selectedCategories.map((category) => category.name);
    this.progress = 100;
    this.uploadStarted = true;
    this.videoService.uploadVideo(this.videoMetadata, this.uploadedVideo, this.uploadedThumbnail).subscribe((res: VideoUploadResponse) => {
      this.uploaded = true;
      this.uploadStarted = false;},
      (error) => { 
        this.uploaded = false;
        this.uploadStarted = false;
        this.erorr = error.error.message;
      });
    
  }

  

}
