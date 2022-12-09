import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/json';
  constructor(
    private _http: HttpClient, 
    private router: Router,
    ) { }

  register(userObj: any) {
    return this._http.post<any>(`${this.apiUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this._http.post<any>(`${this.apiUrl}login`, loginObj);
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
