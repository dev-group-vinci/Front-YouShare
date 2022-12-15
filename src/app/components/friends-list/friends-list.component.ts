import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {FriendService} from "../../services/friend.service";
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(){
    this.friendService.getFriends().subscribe(json_list => {
      this.friends = json_list.map((j: JSON) => new User(j));
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  goToUser(id_user: number) {
    this.router.navigate(['/user'], { queryParams: { id: id_user }});
    this.ngOnInit();
  }

}
