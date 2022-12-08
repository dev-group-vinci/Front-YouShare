import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObservableInput, takeUntil } from 'rxjs';
import { YoutubeService } from 'src/app/services/youtube.service';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from '../../app/models/message.model';
import { Video } from '../../app/models/video.model';
import { DataService } from '../../app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  message$: Message = new Message();
  videos$: Video[] = [
    { id: 1, 
      url: "fk99pry6nY8",
      text: "HAHA",
      state: "published"
    },
    { id: 2, 
      url: "Y58kN2CmFwA",
      text: "LOL",
      state: "published"
    },
    { id: 3, 
      url: "QIZ9aZD6vs0",
      text: "FUNNY",
      state: "published"
    }
  ];
  apiLoaded = false;
  videoId = 'QIZ9aZD6vs0';
  videos: any[];
  unsubscribe$: ObservableInput<any>;

  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService, private dataService: DataService, private auth: AuthService,) {}

  ngOnInit() {
    this.dataService.getMessages().subscribe(data => this.message$ = data);

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

  }

  getValues(val) {
    console.warn(val);
    //TODO Send to backend
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

  logout(){
    this.auth.logout();

  }
  
}
