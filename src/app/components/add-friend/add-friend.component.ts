import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {FormControl} from "@angular/forms";
import {FriendService} from "../../services/friend.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {

  users: User[] = [];
  searchForm = new FormControl();

  constructor(
    private userService: UserService,
    private friendService: FriendService,
    private toast: NgToastService,
  ) {
  }

  ngOnInit(){
    this.userService.search("").subscribe(res => {
      this.users = res;
    });
  }

  search(){
    this.userService.search(this.searchForm.value).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        this.users = [];
      }
    });
  };

  sendFriendRequest(id: number) {
    this.friendService.sendFriendRequest(id).subscribe({
      next: () => {
        this.toast.error({
          detail: "SUCCESS",
          summary: "Demande d'ami envoyé avec succès !",
          duration: 5000
        });
      },
      error: (err) => {
        this.toast.error({
          detail: "ERROR",
          summary: "Il y a eu une erreur !",
          duration: 5000
        });
      }
    });
  }
}
