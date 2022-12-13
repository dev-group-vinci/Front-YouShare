import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.dev";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  getFriends(){
    return this._http.get<User[]>(`${this.apiUrl}friends`);
  }

  getFriendRequests(){
    return this._http.get<User[]>(`${this.apiUrl}friends/requests`);
  }

  acceptFriendRequest(idUser) {
    // @ts-ignore
    this._http.post(`${this.apiUrl}friends/${idUser}/accept`);
  }

  refuseFriendRequest(idUser) {
    // @ts-ignore
    this._http.post(`${this.apiUrl}friends/${idUser}/refuse`);
  }

  sendFriendRequest(id: number){
    return this._http.post(`${this.apiUrl}friends/${id}`,null);
  }
}
