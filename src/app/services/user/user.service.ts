import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { Picture } from '../../models/picture.model';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(
    private _http: HttpClient,
    private router: Router,
    ) { }

  //********* GET FUNCTION *********

  getPicture(id: number) {
    return this._http.get<Picture>(`${this.apiUrl}users/${id}/picture`);
  }

  getSelfPicture() {
    return this._http.get<Picture>(`${this.apiUrl}users/self/picture`);
  }

  getUserLoggedIn(){
    return this._http.get<JSON>(`${this.apiUrl}users`)
  }

  getUserById(id: number){
    return this._http.get<User>(`${this.apiUrl}users/${id}`);
  }

  //********* POST FUNCTION *********

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

  //********* PUT FUNCTION *********

  putInAdmin(id_user: number) {
    return this._http.put<User>(`${this.apiUrl}users/${id_user}`, null);
  }

  search(username: string){
    return this._http.get<User[]>(`${this.apiUrl}users/search/${username}`);
  }
}
