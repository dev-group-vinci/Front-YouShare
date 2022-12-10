import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "oiu"//process.env["BACK_URL"];

  constructor(
    private _http: HttpClient, 
    private router: Router,
    ) { }

  register(userObj: any) {
    return this._http.post<any>("api/register", userObj);
  }

  login(loginObj: any) {
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO   "+this.apiUrl);
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
