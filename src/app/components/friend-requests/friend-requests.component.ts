import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent {

  friendsForm!: FormGroup;
  user$: User;
  friendRequests: User[];

  constructor(
    private fb: FormBuilder,
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
  }

  refuse(idUser){
    this.friendService.refuseFriendRequest(idUser);
  }
}
