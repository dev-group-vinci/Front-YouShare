import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  type: string = "password";
  show: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  hideShowPass(){
    this.show = !this.show;
    this.show ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.show ? this.type = "text" : this.type = "password";
  }
}
