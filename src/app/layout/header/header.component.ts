import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email=null;
  constructor(private auth:AuthService,private toastr:ToastrService,private router:Router) {
    this.auth.observeRefreshHeader().subscribe(() => {
      this.email=null;
      console.log("calling")
      this.ngOnInit();
   });


  }

  ngOnInit() {
    this.auth.getUser().subscribe((user)=>{
      this.email=user.email;
      console.log("user is ",user)
  })
  }

  async handleSignOut(){
     try{
          await this.auth.signOut();
          this.router.navigateByUrl("/signin");
          this.toastr.info("Logged out successfully");

     }catch(error)
     {
       this.toastr.error("problem in signout");
     }
     this.email=null
     this.ngOnInit();
  }

  referesh(){
    this.ngOnInit();
  }

}
