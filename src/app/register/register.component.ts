import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { matchValidator } from 'src/app/helpers/validatePasswordMatch';
import { createPasswordStrengthValidator } from 'src/app/helpers/validatePasswordStrength';
import { AuthService } from 'src/app/services/auth.service';
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
      email: ['', Validators.compose([Validators.required, Validators.email])],
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
          this.toast.success({detail:"SUCCESS", summary: "Vous êtes connecté !", duration: 5000});
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR", summary: "Il y a eu un problème !", duration: 5000});
         }
      })
    } else {
      // throw error message
      ValidateForm.validateAllFormFields(this.registerForm);
    }
  }

  MustMatch(password: string, passwordConfirmation: string) {
    console.log("must  match");

    return (formGroup: FormGroup) => {
      console.log(formGroup.controls[password]);
      console.log(formGroup.controls[passwordConfirmation]);
      const passwordControl = formGroup.controls[password];
      const passwordConfirmationControl = formGroup.controls[passwordConfirmation];

      if (passwordConfirmationControl.errors && !passwordConfirmationControl.errors['MustMatch']) {
        console.log("other");

        return;
      }
      if (passwordControl.value !== passwordConfirmationControl.value) {
        console.log("!==");

        console.log(passwordControl.value)
        console.log(passwordConfirmationControl.value)
        passwordConfirmationControl.setErrors({ MustMatch: true });
      } else {
        console.log("null");

        passwordConfirmationControl.setErrors(null);
      }
    }
  }

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }


}
