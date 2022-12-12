import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {
  friends: User[];

  constructor(
    private data: DataService
  ) {
  }

  ngOnInit(){
    this.data.getFriends().subscribe(response => {
      this.friends = response;
    });
    console.log("friends",this.friends)
  }

}
