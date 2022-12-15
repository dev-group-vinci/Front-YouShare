import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { VideoYoutube } from 'src/app/models/videoyoutube.model';
import { PostService } from 'src/app/services/post/post.service';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';

@Component({
  selector: 'app-idee',
  templateUrl: './idee.component.html',
  styleUrls: ['./idee.component.css']
})
export class IdeeComponent {

  ideaForm!: FormGroup;
  postForm!: FormGroup;
  videos:VideoYoutube[] = [];
  apiLoaded = false;

  constructor(
    private fb: FormBuilder,
    private youTubeService: YoutubeService,
    private posts: PostService,
    private toast: NgToastService,
    private router: Router,
  ) {}

  ngOnInit() {
    //Load Youtube iframe
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    };
    
    //Create the idea form
    this.ideaForm = this.fb.group({
      entry: ['', Validators.required]
    });

    //Create the post form
    this.postForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  search() {
    if(this.ideaForm.valid) {
      this.youTubeService.getVideoTheme(this.ideaForm.value).subscribe(list => {
        let i = 0;
        for(let item of list['items']) {
          this.videos[i] = new VideoYoutube();
          this.videos[i].id_youtube = item.id.videoId;
          
          var parser = new DOMParser;
          let finalResult = parser.parseFromString(item.snippet.title, "text/html")
          this.videos[i].title = finalResult.body.innerHTML;
          i++;
        }
      })
    }
  }

  addPost(id_youtube: string) {
    console.log("TEST");
    if(this.postForm.valid) {
      this.posts.addPostFromIdea(id_youtube, this.postForm.value)
      .subscribe({
        next:() => {
          this.toast.success({detail:"SUCCESS", summary: "Post ajouté", duration: 5000});
          this.postForm.reset();
          this.router.navigate(['/home']);
        },
        error:(err)=>{
          if(err.status === 403) this.toast.error({detail:"ERROR", summary: "Les messages haineux ne sont pas acceptés !", duration: 5000});
          else this.toast.error({detail:"ERROR", summary: "Il y a eu un problème !", duration: 5000});
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.postForm)
    }
  }
}
