import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from 'src/app/services/auth.service';
import {DataService} from 'src/app/services/data.service';
import {YoutubeService} from 'src/app/services/youtube.service';
import {matchValidator} from 'src/app/helpers/validatePasswordMatch';
import {createPasswordStrengthValidator} from 'src/app/helpers/validatePasswordStrength';
import ValidateForm from 'src/app/helpers/validateform';
import {Router} from '@angular/router';
import {NgToastService} from "ng-angular-popup";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

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

  user$: User;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private spinner: NgxSpinnerService,
      private youTubeService: YoutubeService,
      private dataService: DataService,
      private userService: UserService,
      private toast: NgToastService,
      private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [''],
      biography: ['', Validators.maxLength(200)],
      email: ['', Validators.pattern("^\\S+@\\S+\\.\\S+$")],
      password: ['', Validators.required],
      new_password: ['', [matchValidator('passwordConfirmation', true), Validators.minLength(6), createPasswordStrengthValidator()]],
      new_password_confirmation: ['', Validators.compose([matchValidator('password')])],
    })
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user$ = new User(res);
        this.profileForm.patchValue({
          username: this.user$.username,
          biography: this.user$.biography,
          email: this.user$.email
        });
      }
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

      if(this.profileForm.value['new_password'] == '') {
        this.profileForm.patchValue({
          new_password: this.profileForm.value['password'],
          new_password_confirmation: this.profileForm.value['password'],
        });
      }
      if(this.profileForm.value['biography'] == null){
        this.profileForm.patchValue({biography: ""});
      }
      this.dataService.updateUser(this.profileForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: "SUCCESS",
            summary: "Votre profil a été modifié !",
            duration: 5000
          });
          this.profileForm.reset();
          this.profileForm.patchValue({
            username: this.user$.username,
            biography: this.user$.biography,
            email: this.user$.email
          });
          this.router.navigate(['profile']);
        },
        error: (err) => {
          if (err.statusText == 'Conflict') this.toast.error({
            detail: "ERROR",
            summary: "Le nom d'utilisateur ou l'adresse email n'est pas disponible !",
            duration: 5000
          });
          else this.toast.error({
            detail: "ERROR",
            summary: "Il y a eu un problème !",
            duration: 5000,
            type: ""
          });
        }
      })
    } else {
      // throw error message
      ValidateForm.validateAllFormFields(this.profileForm);
    }
  }

  logout() {
    this.auth.logout();
  }
}
