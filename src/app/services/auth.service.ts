import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshHeader = new Subject<any>();
  constructor(private auth:AngularFireAuth) { }

  signUp(email:string,password:string){
     return this.auth.auth.createUserWithEmailAndPassword(email,password);
  }


  signin(email:string,password:string){
    return this.auth.auth.signInWithEmailAndPassword(email,password);
 }

 getUser(){
   return this.auth.authState;
 }

 signOut(){
   this.auth.auth.signOut();
 }
 notifyRefreshHeader() {
  this.refreshHeader.next();
  console.log("hello service");
}
observeRefreshHeader() {
  return this.refreshHeader.asObservable();
}

}
