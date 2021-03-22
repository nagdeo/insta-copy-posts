import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {NgForm} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';

import {readAndCompressImage} from 'browser-image-resizer';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {imageConfig} from 'src/utils/config';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  picture:string=null;
  uploadpercent: number=null;
  constructor(public auth:AuthService,private router :Router,private db:AngularFireDatabase,
    private storage:AngularFireStorage,private toastr:ToastrService) {
      this.picture="../../assets/img.png";
    }

  ngOnInit() {
  }

  onSubmit(f:NgForm){
       const {email,password,username,country,bio,name}=f.form.value;
       this.auth.signUp(email,password)
       .then((res)=>{
         console.log(res);
         const {uid}=res.user;
         this.db.object(`/users/${uid}`)
         .set({
           id:uid,
           name:name,
           email:email,
           instausername:username,
           country:country,
           bio:bio,
           picture:this.picture,
           password:password
         });
       })
       .then(()=>{
         this.router.navigateByUrl('/');
         this.toastr.success("Sign up successfully");
       })
       .catch((err)=>{
        this.toastr.success("Sign up successfully"+err);
       });
       this.auth.notifyRefreshHeader();
  }

  async uploadFile(event){
    const file=event.target.files[0];
    let resizeImage=await readAndCompressImage(file,imageConfig);

    const filepath=File.name;//rename image with uuid

    const fileref=this.storage.ref(filepath);

    const task=this.storage.upload(filepath,resizeImage);

    task.percentageChanges().subscribe((percentage)=>{
      this.uploadpercent=percentage;
    })

    task.snapshotChanges().pipe(
      finalize(()=>{
        fileref.getDownloadURL().subscribe((url)=>{
          this.picture=url;
          console.log(this.picture)
          this.toastr.success('image uploaded successfully');
        })
      })
    ).subscribe();
  }

}
