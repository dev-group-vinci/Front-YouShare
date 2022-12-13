import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";

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
    private auth: AuthService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
      }
    });
    this.data.getFriendRequests().subscribe(response => {
      this.friendRequests = response;
    });
  }

  accept(idUser){
    console.log(idUser)
    this.data.acceptFriendRequest(idUser);
  }

  refuse(idUser){
    this.data.refuseFriendRequest(idUser);
  }
}
