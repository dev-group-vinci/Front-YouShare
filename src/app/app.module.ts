import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
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
import { FriendlistComponent } from './components/friendlist/friendlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FriendlistComponent
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }