import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObservableInput, Subscription } from 'rxjs';
import { YoutubeService } from 'src/app/services/youtube.service';
import { AuthService } from 'src/app/services/auth.service';
import { VideoShow } from 'src/app/models/videoshow.model';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activePost: number|null = null;
  videos$: VideoShow[] = [];

  apiLoaded = false;
  videos: any[];
  titles: string[];
  unsubscribe$: ObservableInput<any>;
  postsForm!: FormGroup;
  currentPageSub :Subscription;
  pictureUrl: string;

  constructor(
    private spinner: NgxSpinnerService,
    private youTubeService: YoutubeService,
    private dataService: DataService,
    private auth: AuthService,
    private posts: PostService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private userService: UserService,
  ) {}

  ngOnInit() {

    //Get the news feed
    this.posts.getPosts().subscribe({
      next: (res) => {
        res.forEach( (v) => {
          let newVideo = new VideoShow();
          newVideo.id = v.id_post;
          newVideo.url = v.id_url;
          newVideo.id_user = v.id_user;
          newVideo.state = v.state;
          newVideo.text = v.text;

          //Get the url of the picture
          this.userService.getPicture(v.id_user).subscribe({
            next: (picture) => {
              newVideo.user_picture = picture.url;
            },
            error: (err) => {
              if (err.status == 404){
                newVideo.user_picture = "../../assets/images/default_user.png";
              }
            }
          })

          //Recover Title Youtube
          this.spinner.show()
          setTimeout(()=> {this.spinner.hide()},3000)
          this.videos = [];
          this.youTubeService.getVideoById(v.id_url).subscribe(list => {
            for (let item of list['items']) {
              this.videos.push(item);
              newVideo.title = item.snippet.title;
            }
          });

          //Recover Number Likes
          this.posts.getNumberLikes(v.id_post).subscribe({
          next: (res) => {
            newVideo.likes = res
          },
          error: (err) => {console.log(err)}
          });

          //Recover Comments
          this.posts.getComments(v.id_post).subscribe({
            next: (res) =>{
              newVideo.comments = res;
              newVideo.numberComments = res.length;
            }
          });

          //Recover Number Shares
          this.posts.getNumberShares(v.id_post).subscribe({
            next: (res) => {
              newVideo.shares = res
            },
            error: (err) => { console.log(err)}
          });

          //Add to video list
          this.videos$.push(newVideo);

        })
      }
    });


    //Load Youtube iframe
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    //Create the form
    this.postsForm = this.fb.group({
      url: ['', Validators.required],
      text: ['', Validators.required]
    })
  };

  getValues(val) {
    return val;
  }

  getTitle(id: string) {
    this.spinner.show()
    setTimeout(()=> {this.spinner.hide()},3000)
    this.videos = [];
    this.youTubeService.getVideoById(id).subscribe(list => {
      for (let item of list['items']) {
        this.videos.push(item);
      }
    });
  }

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
          this.toast.error({detail:"ERROR", summary: "Il y a eu un problème !", duration: 5000});
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
        this.videos$.forEach((v) => {
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
}
