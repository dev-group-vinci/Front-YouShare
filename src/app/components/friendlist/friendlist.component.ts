import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent {

  constructor(
    private router: Router,
    private dataService: DataService, 
    private auth: AuthService,
  ) {}

  ngOnInit(): void {

  }

  logout(){
    this.auth.logout();
  }
}
