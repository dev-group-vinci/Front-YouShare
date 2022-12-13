import {Comment} from "./comment.model";

export class VideoShow {
  [x: string]: any;
    id: number;
    url: string;
    text: string;
    state: string;
    title: string;
    likes: number;
    numberComments: number;
    shares: number;
    comments: Comment[];
}
