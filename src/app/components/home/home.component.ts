import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObservableInput, Subscription, takeUntil } from 'rxjs';
import { YoutubeService } from 'src/app/services/youtube.service';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/message.model';
import { Video } from 'src/app/models/video.model';
import { VideoShow } from 'src/app/models/videoshow.model';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  message$: Message = new Message();
  videos$: VideoShow[] = [
    { id: 1,
      url: "fk99pry6nY8",
      text: "HAHA",
      state: "published",
      title: "",
      likes: -1,
      numberComments: -1,
      shares: -1,
      comments: [],
    },
    { id: 2,
      url: "Y58kN2CmFwA",
      text: "LOL",
      state: "published",
      title: "",
      likes: -1,
      numberComments: -1,
      shares: -1,
      comments: [],

    },
    { id: 3,
      url: "QIZ9aZD6vs0",
      text: "FUNNY",
      state: "published",
      title: "",
      likes: -1,
      numberComments: -1,
      shares: -1,
      comments: [],

    }
  ];
  apiLoaded = false;
  videoId = 'QIZ9aZD6vs0';
  videos: any[];
  titles: string[];
  unsubscribe$: ObservableInput<any>;
  postsForm!: FormGroup;
  currentPageSub :Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private youTubeService: YoutubeService,
    private dataService: DataService,
    private auth: AuthService,
    private posts: PostService,
    private fb: FormBuilder,
    private toast: NgToastService,
  ) {}

  ngOnInit() {
    //this.dataService.getMessages().subscribe(data => this.message$ = data);

    this.videos$.forEach( (v) => {

      //Recover Title Youtube
      this.spinner.show()
      setTimeout(()=> {this.spinner.hide()},3000)
      this.videos = [];
      this.youTubeService.getVideoById(v.url).subscribe(list => {
        for (let item of list['items']) {
          this.videos.push(item);
          v.title = item.snippet.title;
        }
      });
      
      console.log("OK")
      //Recover Number Likes
      this.posts.getNumberLikes(v.id).subscribe({
        next: (res) => {
          v.likes = res,
          console.log("Likes " + res)
        },
        error: (err) => {
          console.log(err)
        }
      })

      //Recover Comments
      this.posts.getComments(v.id).subscribe({
        next: (res) =>{
          v.comments = res;
          v.numberComments = res.length;
        }
      })

      console.log(v);

      //Recover Number Shares
      this.currentPageSub = this.posts.getNumberShares(v.id).subscribe(
        (page: number) => {
          v.shares=page;
        }
      )
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
  }

  getValues(val) {
    return val;
  }

  getTitle(id: string) {
    this.spinner.show()
    setTimeout(()=> {this.spinner.hide()},3000)
    this.videos = [];
    this.youTubeService.getVideoById(id).subscribe(list => {
      for (let item of list['items']) {
        console.log(item);
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
      },
      error:(err)=>{
        this.toast.error({detail:"ERROR", summary: "Il y a eu un problème avec le like !", duration: 5000});
      }
    })
  }
  
}
