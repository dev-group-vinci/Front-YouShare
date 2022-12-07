import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';

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

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.compose([Validators.required])],
    }), {
      validators: this.MustMatch('password', 'passwordConfirmation')
    }
  }

  hideShowPass() {
    this.show = !this.show;
    this.show ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.show ? this.type = "text" : this.type = "password";
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Register user
    } else {
      // throw error message
      ValidateForm.validateAllFormFields(this.registerForm);
    }
  }

  MustMatch(password: string, passwordConfirmation: string) {
    console.log("must  match");
    
    return (formGroup: FormGroup) => {
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
