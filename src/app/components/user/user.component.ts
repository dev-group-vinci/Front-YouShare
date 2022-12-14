import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import { VideoShow } from 'src/app/models/videoshow.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user_id: number;
  user: User;
  apiLoaded = false;
  videos: VideoShow[] = [];
  activePost: number|null = null;
  hasPosts: boolean = false;

  constructor(private router: ActivatedRoute, 
              private userService: UserService, 
              private posts: PostService,
              private utils: UtilsService,
              private auth: AuthService,
              private toast: NgToastService,
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(
      params => {
        this.user_id = params['id'];
      }
    )

    this.userService.getUserById(this.user_id).subscribe({
      next: (res) => {
        this.user = res;
      }
    });

    //Load Youtube iframe
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    //TODO Changer la route quand elle sera finie
    this.posts.getPostsById(this.user_id).subscribe({
      next: (res) => {
        if(res != null) {
          this.videos = this.utils.generateVideoShow(res);
          this.hasPosts = true;
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
      error:(err)=>{
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
      error:(err)=>{
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
      error:(err)=>{
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
      error:(err)=>{
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème avec le share !", duration: 5000});
      }
    })
  }
}
