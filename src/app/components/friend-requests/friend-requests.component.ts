import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {FriendService} from "../../services/friend.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent {

  friendsForm = new FormControl();
  user$: User;
  friendRequests: User[];
  reload: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
      }
    });
    this.friendService.getFriendRequests().subscribe(response => {
      this.friendRequests = response;
    });
  }

  accept(idUser){
    this.friendService.acceptFriendRequest(idUser);
    this.reload = "accept";
  }

  refuse(idUser){
    this.friendService.refuseFriendRequest(idUser);
    this.reload = "refuse";
  }

  goToUser(id_user: number) {
    this.router.navigate(['/user'], { queryParams: { id: id_user }});
  }
}
