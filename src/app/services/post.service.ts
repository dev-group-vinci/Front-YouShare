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
    newForm.text = newForm.text
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const requestOptions = { headers: headers};
    //return this._http.post<any>(`${this.apiUrl}posts`, requestOptions, newForm);
    return this._http.post<any>(`${this.apiUrl}posts`, newForm);
  }

  addLike(id_post: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const requestOptions = { headers: headers};
    console.log("Test2");
    return this._http.post<any>(`${this.apiUrl}posts/${id_post}/likes/`, requestOptions);
  }

  
}
