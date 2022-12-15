import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import { HttpClient } from '@angular/common/http';
import { NewPost } from '../../models/newpost.model';
import { Video } from '../../models/video.model';

import { Comment } from "../../models/comment.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl;
  constructor(
    private _http: HttpClient,
  ) { }

  //************* ADD FUNCTION *************

  addPost(postObj: any) {
    var newPost = new NewPost();
    newPost.id_url = postObj.url;
    newPost.text = postObj.text;

    //Extract the ID Youtube of the URL
    var regex = new RegExp(/(?:\?v=)([^&]+)(?:\&)*/);
    var matches = regex.exec(newPost.id_url);
    if(matches != null) {
      newPost.id_url = matches[1];
    }
    return this._http.post<any>(`${this.apiUrl}posts`, newPost);
  }

  addPostFromIdea(id_youtube: string, postObj: any) {
    var newPost = new NewPost();
    newPost.text = postObj.comment;
    newPost.id_url = id_youtube;

    return this._http.post<any>(`${this.apiUrl}posts`, newPost);
  }

  addLike(id_post: number) {
    return this._http.post<number>(`${this.apiUrl}posts/${id_post}/likes`, null);
  }

  addShare(id_post: number) {
    return this._http.post<number>(`${this.apiUrl}posts/${id_post}/shares`, null);
  }

  createComment(text: string, parentId: string | null, postId: string) : Observable<Comment>{
    return this._http.post<Comment>(`${this.apiUrl}posts/comments/`, {
      id_post: Number(postId),
      id_comment_parent: parentId,
      text: text
    });
  }

  //************* DELETE FUNCTION *************

  deleteLike(id_post: number) {
    return this._http.delete<number>(`${this.apiUrl}posts/${id_post}/likes`);
  }

  deleteShare(id_post: number) {
    return this._http.delete<number>(`${this.apiUrl}posts/${id_post}/shares`);
  }

  deleteComment(comment: Comment){
    return this._http.delete(`${this.apiUrl}posts/${comment.id_post}/comments/${comment.id_comment}`)
  }

  deletePost(id_post: number) {
    return this._http.delete<Video>(`${this.apiUrl}posts/${id_post}`);
  }

  deleteTheComment(id_post: number, id_comment: number) {
    return this._http.delete<Comment>(`${this.apiUrl}posts/${id_post}/comments/${id_comment}`);
  }

  //************* GET FUNCTION *************

  getNumberLikes(id_post: number) {
    return this._http.get<number>(`${this.apiUrl}posts/${id_post}/likes`);
  }

  getComments(id_post: number) {
    return this._http.get<Comment[]>(`${this.apiUrl}posts/${id_post}/comments/`);
  }

  getNumberShares(id_post: number) {
    return this._http.get<number>(`${this.apiUrl}posts/${id_post}/shares`);
  }

  getCommentById(idComment: number, idPost: number){
    return this._http.get<Comment>(`${this.apiUrl}posts/${idPost}/comments/${idComment}`);
  }

  getPosts() {
    return this._http.get<Video[]>(`${this.apiUrl}posts`);
  }

  getPostsById(id_user: number) {
    return this._http.get<Video[]>(`${this.apiUrl}posts/users/${id_user}`);
  }

  //************* IS FUNCTION *************

  isLiked(id_post: number) {
    return this._http.get<boolean>(`${this.apiUrl}posts/${id_post}/likes/is_liked`);
  }

  isShared(id_post: number) {
    return this._http.get<boolean>(`${this.apiUrl}posts/${id_post}/likes/is_shared`);
  }
}
