import { Component } from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  user$: User;
  pictureUrl: string;

  constructor(
    private router: Router,
    private data: DataService,
    private auth: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.data.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
      }
    })

    // get the url of the picture of the user
    this.userService.getSelfPicture()
    .subscribe({
      next: (picture) => {
        this.pictureUrl = picture.url;
      },
      error: (err) => {
        if (err.status == 404){
          this.pictureUrl = "../../assets/images/default_user.png";
        }
      }
    })
    

  }

  logout() {
    this.auth.logout();
  }

}