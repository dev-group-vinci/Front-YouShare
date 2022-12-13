import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  user$: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
      }
    })
  }

  logout() {
    this.auth.logout();
  }

}
