import { VideoMetadata } from "../video-metadata.type"

export interface VideoWatchResponse {
    watchUrl: string
    videoMetadata: VideoMetadata
}