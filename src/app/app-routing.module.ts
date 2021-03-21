import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';

import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { SigninComponent } from './pages/signin/signin.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const redirectUnauthorizedToLoginn=()=>redirectUnauthorizedTo(['signin']);
const redirectLoggedinToHome=()=>redirectLoggedInTo(['']);
const routes: Routes = [
  {path:'signup',component:SignupComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLoggedinToHome}},
  {path:'signin',component:SigninComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLoggedinToHome}},
  {path:'addpost',component:AddpostComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLoginn}
},
  {path:'',component:HomeComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLoginn}},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
