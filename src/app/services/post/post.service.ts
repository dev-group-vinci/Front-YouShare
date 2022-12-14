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
    var newForm = new NewPost();
    newForm.id_url = postObj.url;
    newForm.text = postObj.text;

    return this._http.post<any>(`${this.apiUrl}posts`, newForm);
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
