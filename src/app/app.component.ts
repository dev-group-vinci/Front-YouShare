import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Message } from './message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message$: Message = new Message();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    return this.dataService.getMessages().subscribe(data => this.message$ = data);
  }
}
