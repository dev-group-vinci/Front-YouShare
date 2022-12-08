import { Component } from '@angular/core';
import { Message } from '../models/message.model';
import { Video } from '../models/video.model';
import { DataService } from '../services/data.service';

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

  constructor(private dataService: DataService) {}

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
  
}
