export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';
export type Rating = '1' | '2' | '3' | '4' | '5';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
    rating: Rating;
}
