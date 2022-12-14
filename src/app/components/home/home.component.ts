import { Component } from '@angular/core';
import { ObservableInput, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VideoShow } from 'src/app/models/videoshow.model';
import { PostService } from 'src/app/services/post/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import {Router} from "express";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  activePost: number|null = null;
  videos$: VideoShow[] = [];
  userConnected: User;
  apiLoaded = false;
  titles: string[];
  unsubscribe$: ObservableInput<any>;
  postsForm!: FormGroup;
  currentPageSub :Subscription;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private posts: PostService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private utils: UtilsService,
  ) {}

  ngOnInit() {

    //Get the news feed
    this.posts.getPosts().subscribe({
      next: (res) => {
        this.videos$ = this.utils.generateVideoShow(res);
      }
    });

    //Load Youtube iframe
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    };

    //Create the form
    this.postsForm = this.fb.group({
      url: ['', Validators.required],
      text: ['', Validators.required]
    });

    //Recover the user connected
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.userConnected = new User(res);
      }
    });
  };

  logout(){
    this.auth.logout();
  }

  addPost(){
    if(this.postsForm.valid) {
      this.posts.addPost(this.postsForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"SUCCESS", summary: "Post ajouté", duration: 5000});
          this.postsForm.reset();
        },
        error:(err)=>{
          if(err.status === 403) this.toast.error({detail:"ERROR", summary: "Les messages haineux ne sont pas acceptés !", duration: 5000});
          else this.toast.error({detail:"ERROR", summary: "Il y a eu un problème !", duration: 5000});
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.postsForm)
    }
  }

  addLike(id_post: number) {
    this.posts.addLike(id_post).subscribe({
      next:(res)=>{
        this.toast.success({detail:"SUCCESS", summary: "Like ajouté", duration: 5000});
        //Update Number Like & Logo
        this.videos$.forEach((v) => {
          if(v.id == id_post) {
            v.likes = res;
            v.liked = true;
          }
        });
      },
      error:(err)=>{
        if(err.status == 409) {
          this.toast.error({detail:"ERROR", summary: "Poste déjà liké", duration: 5000});
        }
        else {
          this.toast.error({detail:"ERROR", summary: "Erreur lors du like", duration: 5000});
        }
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
        this.videos$.forEach((v) => {
          if(v.id == id_post) {
            v.shares = res;
            v.shared = true;
          }
        });
      },
      error:(err)=>{
        if(err.status == 409) {
          this.toast.error({detail:"ERROR", summary: "Poste déjà partagé", duration: 5000});
        }
        else {
          this.toast.error({detail:"ERROR", summary: "Erreur lors du partage", duration: 5000});
        }
      }
    })
  }

  deleteLike(id_post: number) {
    this.posts.deleteLike(id_post).subscribe({
      next:(res)=>{
        this.toast.success({detail:"SUCCESS", summary: "Like supprimé", duration: 5000});
        //Update Number Like & Logo
        this.videos$.forEach((v) => {
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
        this.videos$.forEach((v) => {
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

  deletePost(id_post: number) {
    this.posts.deletePost(id_post).subscribe({
      next: () => {
        this.toast.success({detail:"SUCCESS", summary: "Poste supprimé", duration: 5000});
        this.ngOnInit();
      },
      error: (err) => {
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème lors de la suppresion du post !", duration: 5000})
        console.log(err)
      }
    })
  }
}
