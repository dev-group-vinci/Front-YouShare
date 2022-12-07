import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Message } from '../models/message.model';
import { Video } from '../models/video.model';

@Component({
  selector: 'home-root',
  templateUrl: 'home.component.html',
  //styleUrls: ['./app.component.css']
})
export class HomeComponent implements OnInit {
  message$: Message = new Message();
  videos$: Video[] = [
    { id: 1, 
      url: "https://www.youtube.com/watch?v=E0l22mjPLuM",
      text: "HAHA",
      state: "published"
    },
    { id: 2, 
      url: "https://www.youtube.com/watch?v=eBK7WDLBFd0",
      text: "LOL",
      state: "published"
    },
    { id: 3, 
      url: "https://www.youtube.com/watch?v=BDaUNr3unU0&t=4s",
      text: "FUNNY",
      state: "published"
    }
  ]
  constructor(private dataService: DataService) {}

  ngOnInit() {
    return this.dataService.getMessages().subscribe(data => this.message$ = data);
  }

  getValues(val) {
    console.warn(val);
    //TODO Send to backend
  }
}
