import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VideoMetadata } from "../model/video-metadata.type";
import { Observable, forkJoin, map, mergeMap, of } from "rxjs";
import { AppConfigService } from "../../shared/service/configuration.service";
import { VideoUploadRequest } from "../model/request/video-upload.request";
import { VideoUploadResponse } from "../model/response/video-upload.response";
import { VideoWatchResponse } from "../model/response/video-watch.response";


@Injectable()
export class VideoService {
    private videoCache: Map<string, VideoMetadata[]> = new Map();

    constructor (private appConfigService: AppConfigService, private httpClient: HttpClient) { }

    getVideos(pageSize: number, pageNumber: number): Observable<VideoMetadata[]> {
        const cacheKey = `${pageSize}_${pageNumber}`;
        const cachedResponse = this.videoCache.get(cacheKey);

        if (cachedResponse) {
            return of(cachedResponse);
        }

        return this.httpClient.get<VideoMetadata[]>(`${this.appConfigService.API_URL}/videos?ps=${pageSize}&p=${pageNumber}`).pipe(map((response) => {
            this.videoCache.set(cacheKey, response);
            return response;
          }));
    }

    getVideosCategorized(pageSize: number, pageNumber: number, category: string): Observable<VideoMetadata[]> {
        const cacheKey = `${pageSize}_${pageNumber}_${category}`;
        const cachedResponse = this.videoCache.get(cacheKey);

        if (cachedResponse) {
            return of(cachedResponse);
        }

        return this.httpClient.get<VideoMetadata[]>(`${this.appConfigService.API_URL}/videos?ps=${pageSize}&p=${pageNumber}&category=${category}`).pipe(map((response) => {
            this.videoCache.set(cacheKey, response);
            return response;
          }));;
    }

    uploadVideo(uploadRequest: VideoUploadRequest, videoFile: File, thumbnailFile: File): Observable<VideoUploadResponse> {
        return this.httpClient.post<VideoUploadResponse>(`${this.appConfigService.API_URL}/videos/upload`, uploadRequest)
        .pipe(mergeMap((res: VideoUploadResponse) => {
            const videoUpload$ = this.httpClient.put(res.uploadUrl, videoFile);
            const thumbnailUpload$ = this.httpClient.put(res.thumbnailUploadUrl, thumbnailFile);
  
            return forkJoin([videoUpload$, thumbnailUpload$]).pipe(map(() => res));
          })
        );
    }

    watchVideo(videoId: string): Observable<VideoWatchResponse> {
        return this.httpClient.get<VideoWatchResponse>(`${this.appConfigService.API_URL}/videos/watch?v=${videoId}`);
    }

}