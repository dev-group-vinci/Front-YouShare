import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {FormControl} from "@angular/forms";
import {FriendService} from "../../services/friend.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {

  users: User[] = [];
  searchForm = new FormControl();
  reload: string = "";
  userLoggedIn: User;

  constructor(
    private userService: UserService,
    private friendService: FriendService,
    private toast: NgToastService,
    private router: Router,
  ) {
  }

  ngOnInit(){
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.userLoggedIn = new User(res);
        this.userService.search("").subscribe( {
          next: (json_list) => {
            let users = json_list.map((j: JSON) => new User(j))
            for(let user of users){              
              if(user.id_user !== this.userLoggedIn.id_user){
                this.friendService.friendshipStatus(user.id_user)
                .subscribe({
                  next: (res) => {
                    this.users.push(new User(res));
                  },
                  error: () => {
                    user.status = "unknown";
                    this.users.push(user);
                  }
                })
              }
              }
          },
          error: () => {
            this.users = [];
          }
        });
      }
    })


  };

  search(){
    this.users = [];
    this.ngOnInit();
  };

  sendFriendRequest(idUser: number) {
    this.friendService.sendFriendRequest(idUser).subscribe({
      next: () => {
        this.toast.success({
          detail: "SUCCESS",
          summary: "Demande d'ami envoyé avec succès !",
          duration: 5000
        });
        this.users.filter((u) => u.id_user === idUser)[0].status = "sended";
      },
      error: () => {
        this.toast.error({
          detail: "ERROR",
          summary: "Il y a eu une erreur !",
          duration: 5000
        });
      }
    });
  }

  delete(idUser: any) {
    this.friendService.deleteFriend(idUser).subscribe({
      next: () => {
        this.toast.success({
          detail: "SUCCESS",
          summary: "Ami supprimé avec succès !",
          duration: 5000
        });
        this.users.filter((u) => u.id_user === idUser)[0].status = "unknown";
      },
      error: (err) => {
        if(err.title == "Forbidden"){
          this.toast.error({
            detail: "ERROR",
            summary: "Vous ne pouvez pas vous ajouter en ami !",
            duration: 5000
          });
        } else if (err.title == "Conflict"){
          this.toast.error({
            detail: "ERROR",
            summary: "Vous avez déjà demandé cette personne en ami !",
            duration: 5000
          });
        } else {
          this.toast.error({
            detail: "ERROR",
            summary: "Il y a eu une erreur !",
            duration: 5000
          });
        }
      }
    });
    this.reload = "delete";
  }

  accept(idUser){
    this.friendService.acceptFriendRequest(idUser).subscribe({
      next: () => {
        this.toast.success({
          detail: "SUCCESS",
          summary: "Ami accepté avec succès !",
          duration: 5000
        });
        this.users.filter((u) => u.id_user === idUser)[0].status = "accepted";
        this.reload = "accept";
      },
      error: () => {
        this.toast.error({
          detail: "ERROR",
          summary: "Il y a eu une erreur !",
          duration: 5000
        });
      }
    });
  }

  refuse(idUser){
    this.friendService.refuseFriendRequest(idUser).subscribe({
      next: () => {
        this.toast.success({
          detail: "SUCCESS",
          summary: "Ami refusé avec succès !",
          duration: 5000
        });
        this.users.filter((u) => u.id_user === idUser)[0].status = "unknown";
      },
      error: () => {
        this.toast.error({
          detail: "ERROR",
          summary: "Il y a eu une erreur !",
          duration: 5000
        });
      }
    });
  }

  goToUser(id_user: number) {
    this.router.navigate(['/user'], { queryParams: { id: id_user }});
  }

}
