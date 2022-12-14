import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import { VideoShow } from 'src/app/models/videoshow.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import {FriendService} from "../../services/friend.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user_id: number;
  user: User;
  userConnected: User;
  apiLoaded = false;
  videos: VideoShow[] = [];
  activePost: number|null = null;
  reload: string = "";

  constructor(private router: ActivatedRoute,
              private friendService: FriendService,
              private userService: UserService,
              private posts: PostService,
              private utils: UtilsService,
              private auth: AuthService,
              private toast: NgToastService,
  ) {}

  ngOnInit() {

    //Recover the id user of the profile
    this.router.queryParams.subscribe(
      params => {
        this.user_id = params['id'];
      }
    );

    //Recover the user connected
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.userConnected = new User(res);
        //Recover the user from the id
        if(this.user_id == this.userConnected.id_user){
          this.userConnected.status = "me";
          this.user = this.userConnected;
        } else {
          this.friendService.friendshipStatus(this.user_id).subscribe({
            next: (res) => {
              this.user = new User(res);
            }
          });
        }
      }
    });

    //Load Youtube iframe
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    //Recover posts of the user
    this.posts.getPostsById(this.user_id).subscribe({
      next: (res) => {
        if(res != null) {
          this.videos = this.utils.generateVideoShow(res);
        }
      }
    });
  }

  logout(){
    this.auth.logout();
  }

  addLike(id_post: number) {
    this.posts.addLike(id_post).subscribe({
      next:(res)=>{
        this.toast.success({detail:"SUCCESS", summary: "Like ajouté", duration: 5000});
        //Update Number Like & Logo
        this.videos.forEach((v) => {
          if(v.id == id_post) {
            v.likes = res;
            v.liked = true;
          }
        });
      },
      error:()=>{
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème avec le like !", duration: 5000});
      }
    })
  }

  setActivePost(idPost: number | null): void {
    if(this.activePost) this.activePost = null;
    else this.activePost = idPost;
  }

  displayComments(idPost: number){
    if(this.activePost && this.activePost == idPost){
      return true;
    } else return false;
  }

  addShare(id_post: number) {
    this.posts.addShare(id_post).subscribe({
      next:(res)=>{
        this.toast.success({detail:"SUCCESS", summary: "Share ajouté", duration: 5000});
        //Update Number Share & Logo
        this.videos.forEach((v) => {
          if(v.id == id_post) {
            v.shares = res;
            v.shared = true;
          }
        });
      },
      error:()=>{
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème avec le share !", duration: 5000});
      }
    })
  }

  deleteLike(id_post: number) {
    this.posts.deleteLike(id_post).subscribe({
      next:(res)=>{
        this.toast.success({detail:"SUCCESS", summary: "Like supprimé", duration: 5000});
        //Update Number Like & Logo
        this.videos.forEach((v) => {
          if(v.id == id_post) {
            v.likes = res;
            v.liked = false;
          }
        });
      },
      error:()=>{
        this.toast.error({detail:"ERROR", summary: "Le Like n'a pas pu être supprimé", duration: 5000});
      }
    })
  }

  deleteShare(id_post: number) {
    this.posts.deleteShare(id_post).subscribe({
      next:(res)=>{
        this.toast.success({detail:"SUCCESS", summary: "Share supprimé", duration: 5000});
        //Update Number Share & Logo
        this.videos.forEach((v) => {
          if(v.id == id_post) {
            v.shares = res;
            v.shared = false;
          }
        });
      },
      error:()=>{
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème avec le share !", duration: 5000});
      }
    })
  }

  deletePost(id_post: number) {
    this.posts.deletePost(id_post).subscribe({
      next: () => {
        this.toast.success({detail:"SUCCESS", summary: "Poste supprimé", duration: 5000});
        this.ngOnInit();
      },
      error: () => {
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème lors de la suppresion du post !", duration: 5000})
      }
    })
  }

  changeInAdmin(id_user: number) {
    this.userService.putInAdmin(id_user).subscribe({
      next:() => {
        this.toast.success({detail:"SUCCESS", summary: "Utilisateur passé admin", duration: 5000});
        this.ngOnInit();
      },
      error:(err) => {
        if(err.status == 400) {
          this.toast.success({detail:"ERROR", summary: "Utilisateur déjà admin", duration: 5000});
        }
        else {
          this.toast.success({detail:"ERROR", summary: "Problème pour passer un utilisateur admin", duration: 5000});
        }
      }
    })
  }

  sendFriendRequest(idUser: number) {
    this.friendService.sendFriendRequest(idUser).subscribe({
      next: () => {
        this.toast.success({
          detail: "SUCCESS",
          summary: "Demande d'ami envoyé avec succès !",
          duration: 5000
        });
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
}
