import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  user$: User;
  constructor(
    private router: Router,
    private data: DataService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.data.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
      }
    })
  }

  logout() {
    this.auth.logout();
  }

}
