import { Category } from "./category.type";

export interface VideoMetadata {
    title: string;
    description: string;
    videoId: string;
    productionYear: number;
    length: number;
    thumbnailId: string;
    thumbnailUrl: string;
    categories: Category[];
}