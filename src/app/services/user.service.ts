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
    let temp = this._http.get<Picture>(`${this.apiUrl}users/1/picture`);
    console.log("YYYYYYYYYYYY" + temp);
    
    return temp;
  }
}
