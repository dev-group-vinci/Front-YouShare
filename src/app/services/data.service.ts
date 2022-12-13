import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { environment } from 'src/environments/environment.dev';
import {AuthService} from "./auth.service";

const httpOptions : any    = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.apiUrl;
  //apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(
    private _http: HttpClient,
    private auth: AuthService,
  ) { }

  getMessages() {
    return this._http.get<Message>(`${this.apiUrl}json`);
  }

  updateUser(userObj: any){
    return this._http.put<any>(`${this.apiUrl}users`, userObj);
  }
}
