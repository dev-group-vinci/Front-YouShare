import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {

  constructor(private router: Router) {}

  goToUser(id_user: number) {
    this.router.navigate(['/user'], { queryParams: { id: id_user }});
  }
}
