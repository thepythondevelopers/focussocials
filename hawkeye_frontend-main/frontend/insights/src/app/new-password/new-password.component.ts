import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CreateOtpCollectionService } from '../create-otp-collection.service';
import { ForgotserviceService } from '../forgotservice.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css','../forgot-password/forgot-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private toast:NgToastService, private coc:CreateOtpCollectionService, private forgot : ForgotserviceService,private router : Router) { 
    if(!localStorage.getItem("recover_password_of")){
      this.router.navigate(['/forgot_password']);
    }
    else if(!localStorage.getItem("new_password_page_access")){
      this.router.navigate(['/one_time_password'])
    }
  }

  forgotpass(data:any){
    if(data.pass && data.confirm_pass)
    {
      if(data.pass.length<8)
    this.toast.error({detail:"Failure Message",summary:"Password must be atleast 8 characters long",duration:5000});
    else if(data.pass.length>15)
    this.toast.error({detail:"Failure Message",summary:"Password cannot be more than 15 characters long",duration:5000});
    else{
      if(data.pass===data.confirm_pass){
        this.forgot.new_password(localStorage.getItem("recover_password_of"),data.pass).subscribe((res:any)=>{
          console.log("response from new password::",res);
          if(res.msg==="Password changed successfully"){
            this.toast.success({detail:"Success Message",summary:res.msg,duration:5000});
            this.router.navigate(['/login'])
            localStorage.removeItem("recover_password_of");
          }
          else{
            this.toast.error({detail:"Failure Message",summary:res.msg,duration:5000}); 
          }
          });
      }
    else{
      this.toast.error({detail:"Failure Message",summary:"Password and confirm password doesn't match",duration:5000}); 
    }
    }
    }
    else{
      if(!data.pass)
      this.toast.error({detail:"Failure Message",summary:"New Password cannot be left empty",duration:5000}); 
      else if(!data.confirm_pass){
      this.toast.error({detail:"Failure Message",summary:"Confirm Password cannot be left empty",duration:5000});   
      }
    } 
  }

  ngOnInit(): void {
  }

}
