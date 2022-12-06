import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './message.model';

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
  apiUrl = 'http://localhost:8080/json';
  //apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private _http: HttpClient) { }

  getMessages() {
    return this._http.get<Message>(this.apiUrl);
  }
}
