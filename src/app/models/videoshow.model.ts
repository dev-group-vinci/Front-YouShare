export class VideoShow {
  [x: string]: any;
    id: number;
    url: string;
    text: string;
    state: string;
    title: string;
    likes: number;
    liked: boolean;
    numberComments: number;
    shares: number;
    comments: Comment[];
}