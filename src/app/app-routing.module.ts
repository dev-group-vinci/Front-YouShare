import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import {AddFriendComponent} from "./components/add-friend/add-friend.component";
import { UserComponent } from './components/user/user.component';
import { IdeeComponent } from './components/idee/idee.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'idee', component: IdeeComponent, canActivate: [AuthGuard]},
  { path: 'friendrequests', component: FriendRequestsComponent, canActivate: [AuthGuard]},
  { path: 'addfriend', component: AddFriendComponent, canActivate: [AuthGuard]},
  { path: '**',   redirectTo: 'home', pathMatch: 'full' }, //{ path: '**', component: PageNotFoundComponent }, TODO on peut changer si on veut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
