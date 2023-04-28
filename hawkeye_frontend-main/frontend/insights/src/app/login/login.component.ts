import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from '../login.service';
import { CookieService } from 'ngx-cookie-service';
import { NgModel } from '@angular/forms';
var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cb: boolean=false;
  eye: boolean=false;
  conversionEncryptOutput: any;
  decPassword:any;  
  conversionDecryptOutput:any;
  email: any;
  password: any;
  public Formdata:any = {};
  
  constructor(private cookieService:CookieService,private toast:NgToastService,private router : Router, private login : LoginService) {
    if(this.cookieService.get("myemail")){
    this.Formdata.email=this.cookieService.get("myemail");
    this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.cookieService.get("mypass").trim(), "encrypt_pass").toString(CryptoJS.enc.Utf8);  
    this.Formdata.password=this.conversionDecryptOutput;
    console.log("email::",this.email)
    }
    /*if(localStorage.getItem("jwt")){
      this.router.navigate(['/login-with-facebook']);
    }*/
    if(localStorage.getItem("email")){
      this.router.navigate(['/login-with-facebook']);
    }
    if(localStorage.getItem("recover_password_of"))
      localStorage.removeItem("recover_password_of");

    if(localStorage.getItem("new_password_page_access")){
      localStorage.removeItem("new_password_page_access")
    }
   }
  logindata(data:any){
    console.log("data from login::",data)
    if(data.email && data.password)
    this.login.Login(data);
    else{
      if(!data.email)
      this.toast.error({detail:"Failure Message",summary:"Email Cannot be empty",duration:5000}); 
      else if(!data.password)
      this.toast.error({detail:"Failure Message",summary:"Password Cannot be empty",duration:5000});
    } 
    if(this.cb===true){
      this.conversionEncryptOutput = CryptoJS.AES.encrypt((data.password).trim(), "encrypt_pass").toString(); 
      //document.cookie="myemail="+data.email+";path=http://localhost:4200/";
      //document.cookie="mypass="+this.conversionEncryptOutput+";path=http://localhost:4200/";
      document.cookie="myemail="+data.email+";path=https://focussocials.com/";
      document.cookie="mypass="+this.conversionEncryptOutput+";path=https://focussocials.com/";
    }
  }
  checkbox(){
    this.cb=!this.cb;
  }
  eyeone(){
    this.eye=!this.eye;
  }
  ngOnInit(): void {
  }

}
