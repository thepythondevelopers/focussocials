import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotserviceService {

  constructor(private http : HttpClient, private router : Router) { }
  Forgot(email:any,otp:any){
    return this.http.post(environment.baseURL+'/send_update_otp',{"email":email,"otp":otp});
    }
  new_password(email:any,password:any){
    console.log("from new password::",email," ",password);
    return this.http.post(environment.baseURL+'/new_password',{"email":email,"password":password});
  }
  get_otp(email:any){
    return this.http.post(environment.baseURL+'/get_otp',{"email":email});
  }
}
