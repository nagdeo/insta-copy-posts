import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private auth:AuthService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm){
     const {email,password}=f.form.value;
     this.auth.signin(email,password)
     .then((res)=>{
       this.toastr.success("signed in ");
       this.router.navigateByUrl('/');
     })
     .catch((error)=>{
        this.toastr.error(error.messaage,'',{closeButton:true});
     })
  }

}
