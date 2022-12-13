import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment.dev";
import { Picture } from '../models/picture.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(
    private _http: HttpClient,
    private router: Router,
    ) { }

  getPicture(id: number) {
    return this._http.get<Picture>(`${this.apiUrl}users/${id}/picture`);
  }

  getSelfPicture() {
    return this._http.get<Picture>(`${this.apiUrl}users/self/picture`);
  }

  uploadPicture(file: any){
    const payload = new FormData();
    payload.append("image", file, file.name);
    return this._http.post(`${this.apiUrl}users/self/picture`, payload, { 
      responseType: 'json'}).subscribe(
        (object) => {
          console.log("QQQQQQQQQQQQQQQQQQQ"); //TODO Eliott
          console.log(object);
        
    });
  }
}
