import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  type: string = "password";
  show: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder){

  }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.show = !this.show;
    this.show ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.show ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this.loginForm.valid){
      // Send to database
    } else {
      // throw error message
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

}
