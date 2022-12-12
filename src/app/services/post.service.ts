import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.dev";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewPost } from '../models/newpost.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl;
  constructor(
    private _http: HttpClient,
  ) { }

  addPost(postObj: any) {
    var newForm = new NewPost();
    newForm.id_url = postObj.url;
    newForm.text = postObj.text;
    
    return this._http.post<any>(`${this.apiUrl}posts`, newForm);
  }

  addLike(id_post: number) {
    return this._http.post<any>(`${this.apiUrl}posts/${id_post}/likes/`, null);
  }

  getNumberLikes(id_post: number) {
    console.log(this._http.get<number>(`${this.apiUrl}posts/${id_post}/likes/`))
    return this._http.get<number>(`${this.apiUrl}posts/${id_post}/likes`);
  }

  getComments(id_post: number) {
    return this._http.get<Comment[]>(`${this.apiUrl}posts/${id_post}/comments/`);
  }

  getNumberShares(id_post: number) {
    return this._http.get<any>(`${this.apiUrl}posts/${id_post}/shares/`);
  }
}
