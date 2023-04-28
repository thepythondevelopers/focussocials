import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CreateOtpCollectionService } from '../create-otp-collection.service';
import { ForgotserviceService } from '../forgotservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private coc:CreateOtpCollectionService, private toast:NgToastService, private router : Router, private forgot : ForgotserviceService){
    if(localStorage.getItem("jwt")){
      this.router.navigate(['/dashboard']);
    }
   }

  forgotemail(data:any){
    if(data.email)
    {
      this.forgot.Forgot(data.email,(Math.round(100000*Math.random())).toString()).subscribe((res:any)=>{
      console.log("response from forgot password::",res);
      if(res.error){
        this.toast.error({detail:"Failure Message",summary:res.error,duration:5000});
      }
      else{
        if(res.msg==='Email Sent Successfully'){
          this.router.navigate(['/one_time_password']);
          localStorage.setItem("recover_password_of",data.email);
          let timerId =setInterval(() => this.coc.expire_otp(data.email).subscribe((response:any)=>{
            console.log("response from expire otp::",response);
          }), 60000);
          setTimeout(() => { clearInterval(timerId);}, 65000);
        }
        else{
          this.toast.error({detail:"Failure Message",summary:res.msg,duration:5000});
        }
      }
      });
    }
    else{
      if(!data.email)
      this.toast.error({detail:"Failure Message",summary:"Email cannot be left empty",duration:5000}); 
    } 
  }
  ngOnInit(): void {
  }

}
