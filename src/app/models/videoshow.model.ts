import {Comment} from "./comment.model";
import { User } from "./user.model";

export class VideoShow {
  [x: string]: any;
    id: number;
    url: string;
    id_user: number;
    text: string;
    state: string;
    title: string;
    likes: number;
    liked: boolean;
    numberComments: number;
    shares: number;
    shared: boolean;
    comments: Comment[];
    user: User;
    date: string;
  }
