import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { ProfileImageService } from '../profile-image.service';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import {NgToastService} from 'ng-angular-popup';
import { FillInstaAccountsService } from '../fill-insta-accounts.service';
import { GetUsernameService } from '../get-username.service';

@Component({
  selector: 'app-login-with-facebook',
  templateUrl: './login-with-facebook.component.html',
  styleUrls: ['./login-with-facebook.component.css']
})
export class LoginWithFacebookComponent implements OnInit {
  user:any;
  loggedIn:any;
  authtoken:any;
  access_token: any;
  ig_id: any;
  errors: any;
  displayerrors: any=false;

  constructor(private get_username:GetUsernameService,private fia : FillInstaAccountsService,private toast:NgToastService,private cookieService: CookieService,private pis: ProfileImageService,private http: HttpClient, private router : Router, private authService: SocialAuthService,) {
    /*if(!localStorage.getItem("jwt")){
      this.router.navigate(['/signup']);
    }
    else{
      if(localStorage.getItem("auth_token")){
        this.router.navigate(['/dashboard']);  
      }
    }*/
    this.cookieService.delete("c_user","/",".facebook.com",true,"None");
    if(!localStorage.getItem("email")){
      this.router.navigate(['/signup']);
    }
    else{
      if(localStorage.getItem("access_token")){
        //this.router.navigate(['/dashboard']);  
      }
    }
   }
   

   ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.authtoken=user.authToken;
      console.log("User=",user.authToken);
      localStorage.setItem("auth_token",user.authToken);
      this.loggedIn = (user != null);
      this.access_token_and_ig_id(this.authtoken);
    });
  }
  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement'
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions);
  }
  access_token_and_ig_id(auth_token : any) {
    let url='https://graph.facebook.com/v8.0/me/accounts?fields=access_token,instagram_business_account{id}&access_token='+auth_token;
    this.http.get(url).subscribe((res:any)=>{
        console.log("data in response=",res.data);
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].access_token){
            if(res.data[i].instagram_business_account){
              this.access_token=res.data[i].access_token;
              this.ig_id=res.data[i].instagram_business_account.id;
              localStorage.setItem("access_token",this.access_token);
              localStorage.setItem("ig_id",this.ig_id);
              this.get_username.gsn(this.ig_id,this.access_token).subscribe({
                next: (response:any) => localStorage.setItem("active",response.username), 
                error: (error) => {
                  console.log("error getting name");
                }
              })
              this.fia.fill_insta_accounts(localStorage.getItem("email"),this.access_token,this.ig_id).subscribe((response)=>{
              console.log("repsonse from fill accounts::",response);
            }) 
            }
          }
        }
        if(localStorage.getItem("ig_id")){
          let keys = Object.keys(localStorage);
          let len = keys.length;
          console.log("length of localstorage::",len);
          if(len>4)
          this.router.navigate(['/dashboard']);
        }
        else{
          this.toast.error({detail:"Failure Message",summary:"Please select atleast one ig account and fb page that are connected to each other",duration:5000});
        }
    },error => {
      this.displayerrors=true;
      this.errors = error;
      this.errors=this.errors.error.error.message;
    })
  }
  Cookies(){
    this.cookieService.deleteAll();
    document.cookie = "c_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.authService.signOut();
  }

  gtpp(){
    this.router.navigate(['/pricing']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/signup']);
  }
}
