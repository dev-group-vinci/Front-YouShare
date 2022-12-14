import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  public userLoggedIn: User;
  constructor(
    private _http: HttpClient,
    private router: Router,
    ) { }

  register(userObj: any) {
    return this._http.post<any>(`${this.apiUrl}users/register`, userObj);
  }

  login(loginObj: any) {
    return this._http.post<any>(`${this.apiUrl}users/login`, loginObj);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

}
