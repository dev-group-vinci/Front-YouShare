import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { VideoShow } from 'src/app/models/videoshow.model';
import { VideoYoutube } from 'src/app/models/videoyoutube.model';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';

@Component({
  selector: 'app-idee',
  templateUrl: './idee.component.html',
  styleUrls: ['./idee.component.css']
})
export class IdeeComponent {

  ideaForm!: FormGroup;
  videos:VideoYoutube[] = [];

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private youTubeService: YoutubeService,
  ) {}

  ngOnInit() {
    //Create the form
    this.ideaForm = this.fb.group({
      entry: ['', Validators.required]
    });
  }

  search() {
    if(this.ideaForm.valid) {
      this.youTubeService.getVideoTheme(this.ideaForm.value).subscribe(list => {
        let i = 0;
        for(let item of list['items']) {
          this.videos[i] = new VideoYoutube();
          this.videos[i].id_youtube = item.id.videoId;
          this.videos[i].title = item.snippet.title;
          this.videos[i].description = item.snippet.description;
          i++;
        }
        console.log(this.videos);
      })
    }
  }
}
