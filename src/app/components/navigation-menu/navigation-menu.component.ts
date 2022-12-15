import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  user: User;
  pictureUrl: string;
  @Input() someValueToGetChanges: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user = new User(res);
      }
    })
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  logout() {
    this.auth.logout();
  }

  goToUser(id_user: number) {
    this.router.navigate(['/user'], { queryParams: { id: id_user }});
  }

}
