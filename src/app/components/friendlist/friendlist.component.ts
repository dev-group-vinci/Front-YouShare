import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent {

  friendsForm!: FormGroup;
  user$: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private data: DataService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.data.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
      }
    })
  }

  logout(){
    this.auth.logout();
  }
}
