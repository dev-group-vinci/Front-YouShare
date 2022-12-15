import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DataService } from './services/data/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NgToastModule } from 'ng-angular-popup';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProfileComponent } from './components/profile/profile.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import {TokenInterceptor} from "./services/token/token.interceptor";
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { UserComponent } from './components/user/user.component';
import { IdeeComponent } from './components/idee/idee.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FriendRequestsComponent,
    NavigationMenuComponent,
    FriendsListComponent,
    AddFriendComponent,
    CommentsComponent,
    CommentComponent,
    CommentFormComponent,
    UserComponent,
    IdeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    YouTubePlayerModule,
    NgToastModule,
    NgxSpinnerModule,
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
