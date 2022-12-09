import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { YoutubeService } from 'src/app/services/youtube.service';
import { matchValidator } from 'src/app/helpers/validatePasswordMatch';
import { createPasswordStrengthValidator } from 'src/app/helpers/validatePasswordStrength';
import ValidateForm from 'src/app/helpers/validateform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  type: string = "password";
  show: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private spinner: NgxSpinnerService, 
    private youTubeService: YoutubeService, 
    private dataService: DataService, 
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [''],
      email: ['',Validators.email],
      oldPassword: ['', Validators.required],
      password: ['', [matchValidator('passwordConfirmation', true), Validators.minLength(6), createPasswordStrengthValidator()]],
      passwordConfirmation: ['', Validators.compose([matchValidator('password')])],
    })
  }

  hideShowPass() {
    this.show = !this.show;
    this.show ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.show ? this.type = "text" : this.type = "password";
  }

  onModify() {
    if (this.profileForm.valid) {
      // Modify user
      this.auth.register(this.profileForm.value)
      .subscribe({
        next:(res)=>{
          // to do : display success
          this.profileForm.reset();
          this.router.navigate(['/']);
        },
        error:(err)=>{
          // to do : display error
         }
      })
    } else {
      // throw error message
      ValidateForm.validateAllFormFields(this.profileForm);
    }
  }

  logout(){
    this.auth.logout();
  }
}
