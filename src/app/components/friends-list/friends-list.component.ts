import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {
  friends: User[] = [];
  @Input() someValueToGetChanges: string;

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

  ngOnChanges() {
    this.ngOnInit();
  }

}
