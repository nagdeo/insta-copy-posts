import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {environment} from './../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './components/user/user.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FirebaseApp } from '@angular/fire';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { HeaderComponent } from './layout/header/header.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    UserComponent,
    FooterComponent,
    AddpostComponent,
    PagenotfoundComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(
      apiKey: "AIzaSyA3Amh2ZxHO0HK6Uov3odziWrcTfbWEAiA",
      authDomain: "insta-maker-copy.firebaseapp.com",
      databaseURL: "https://insta-maker-copy-default-rtdb.firebaseio.com",
      projectId: "insta-maker-copy",
      storageBucket: "insta-maker-copy.appspot.com",
      messagingSenderId: "252733986596",
      appId: "1:252733986596:web:337efc90df59fb1865c5b1"
    ),
    HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,CommonModule,
    AngularFireAuthGuardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
