import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ForgotserviceService } from '../forgotservice.service';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css','../forgot-password/forgot-password.component.css']
})
export class OtpPageComponent implements OnInit {

  constructor(private router : Router, private toast:NgToastService, private forgot : ForgotserviceService) {
    if(!localStorage.getItem("recover_password_of")){
      this.router.navigate(['/forgot_password']);
    }
   }

  ngOnInit(): void {
  }

  checkotp(data:any){
    if(data.otp)
    {
      this.forgot.get_otp(localStorage.getItem("recover_password_of")).subscribe((res:any)=>{
      if(res.msg===data.otp){
        this.router.navigate(['/new_password']);
        localStorage.setItem("new_password_page_access","ok")
      }
      else{
        this.toast.error({detail:"Failure Message",summary:"Invalid OTP",duration:5000}); 
      }
      });
    }
    else{
      this.toast.error({detail:"Failure Message",summary:"OTP cannot be left empty",duration:5000}); 
    } 
  }
}
