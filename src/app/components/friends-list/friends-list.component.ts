import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {
  friends: User[] = [];

  constructor(
    private friendService: FriendService,
  ) {
  }

  ngOnInit(){
    this.friendService.getFriends().subscribe(response => {
      this.friends = response;
    });
    console.log("friends",this.friends)
  }

}
