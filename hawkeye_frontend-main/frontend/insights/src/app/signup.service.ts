import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {environment} from '../environments/environment';
import { CreateOtpCollectionService } from './create-otp-collection.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private coc:CreateOtpCollectionService,private toast:NgToastService,private http : HttpClient, private router: Router) { }
  signup(req:any){
    if(req.fname==="")
    this.toast.error({detail:"Failure Message",summary:"First name cannot be empty",duration:5000});
    else if(req.lname==="")
    this.toast.error({detail:"Failure Message",summary:"Last name cannot be empty",duration:5000});
    else if(req.email==="")
    this.toast.error({detail:"Failure Message",summary:"Email cannot be empty",duration:5000});
    else if(req.phno==="")
    this.toast.error({detail:"Failure Message",summary:"Phone number cannot be empty",duration:5000});
    else if(req.password==="")
    this.toast.error({detail:"Failure Message",summary:"Password cannot be empty",duration:5000});
    else if(req.confirm_password==="")
    this.toast.error({detail:"Failure Message",summary:"Confirm Password cannot be empty",duration:5000});
    else if(req.password!==req.confirm_password)
    {
      this.toast.error({detail:"Failure Message",summary:"Password and confirm password doesn't match",duration:5000});
    }
    else if(req.password.length<8)
    this.toast.error({detail:"Failure Message",summary:"Password must be atleast 8 characters long",duration:5000});
    else if(req.password.length>15)
    this.toast.error({detail:"Failure Message",summary:"Password cannot be more than 15 characters long",duration:5000});
    else{
      console.log('request from signup',req);
    this.http.post(environment.baseURL+'/register',(req)).subscribe((res:any)=>{
      if(res.msg==="registration successfull"){
        this.toast.success({detail:"Success Message",summary:"Registration Successful",duration:5000});
        this.router.navigate(['/login']);
        this.coc.create_otp_collection(req.email).subscribe((response:any)=>{
          console.log("response from create otp collection",response);
        })
      }
      else if(res.msg==="Email already exists"){
        this.toast.error({detail:"Failure Message",summary:res.msg,duration:5000});
      }
      else if(res.error){
        this.toast.error({detail:"Failure Message",summary:res.error,duration:5000});
      }
    })
    }

    }
  }
