import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'home-root',
  templateUrl: 'home.component.html',
  //styleUrls: ['./app.component.css']
})
export class HomeComponent implements OnInit {
  message$: Message = new Message();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    return this.dataService.getMessages().subscribe(data => this.message$ = data);
  }

  getValues(val) {
    console.warn(val);
    //TODO Send to backend
  }
}
