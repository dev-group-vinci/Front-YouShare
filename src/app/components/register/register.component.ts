import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { matchValidator } from 'src/app/helpers/validatePasswordMatch';
import { createPasswordStrengthValidator } from 'src/app/helpers/validatePasswordStrength';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  type: string = "password";
  show: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^\\S+@\\S+\\.\\S+$")])],
      password: ['', [Validators.required, matchValidator('passwordConfirmation', true), Validators.minLength(6), createPasswordStrengthValidator()]],
      passwordConfirmation: ['', Validators.compose([Validators.required, matchValidator('password')])],
    })
  }

  hideShowPass() {
    this.show = !this.show;
    this.show ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.show ? this.type = "text" : this.type = "password";
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Register user
      this.auth.register(this.registerForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"SUCCESS", summary: "Vous êtes inscrit !", duration: 5000});
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          console.log(err)
          if(err.statusText == 'Conflict') this.toast.error({detail:"ERROR", summary: "Le nom d'utilisateur ou l'adresse email est déjà utilisé !", duration: 5000});
          else this.toast.error({detail:"ERROR", summary: "Il y a eu un problème !", duration: 5000, type:""});
         }
      })
    } else {
      // throw error message
      ValidateForm.validateAllFormFields(this.registerForm);
    }
  }
}
