import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email=null;
  homeActive:any="";
  isLoading:boolean=true;
  constructor(private auth:AuthService,private toastr:ToastrService,
    private router:Router,private route:ActivatedRoute,
    ) {
    this.auth.observeRefreshHeader().subscribe(() => {
      this.email=null;
      console.log("calling")
      this.ngOnInit();
   });
     // console.log(this.router)



  }

  ngOnInit() {
    this.auth.getUser().subscribe((user)=>{
      if(user){
        this.email=user.email;
        this.isLoading=false;

      }
      console.log("user is ",user)

  });
  this.router.events.subscribe(event => {
    if(event instanceof NavigationStart){
        console.log('this is what your looking for ', event.url);
          this.homeActive=event.url;
     }
   }
);
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
