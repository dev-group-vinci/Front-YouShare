import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
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
    return this._http.post(`${this.apiUrl}friends/${idUser}/accept`, null);
  }

  refuseFriendRequest(idUser) {
    return this._http.post(`${this.apiUrl}friends/${idUser}/refuse`, null);
  }

  sendFriendRequest(id: number){
    return this._http.post(`${this.apiUrl}friends/${id}`,null);
  }

  friendshipStatus(idUser: number) {
    // pending, accepted, refused
    return this._http.get<JSON>(`${this.apiUrl}friends/${idUser}`);
  }

  deleteFriend(idUser: number) {
    return this._http.delete(`${this.apiUrl}friends/${idUser}`);
  }

}
