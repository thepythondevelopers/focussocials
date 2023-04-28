import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { CheckUserPlanService } from '../check-user-plan.service';
import { NgToastService } from 'ng-angular-popup';
import { CfiService } from '../cfi.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
@Injectable()
export class PricingComponent implements OnInit {

  constructor(private cfi: CfiService,private toast:NgToastService,private cup: CheckUserPlanService,private http: HttpClient,private router : Router,private checkout: CheckoutService) { 
    this.check_plan();
  }

  ngOnInit(): void {
    if(!localStorage.getItem('email')){
      this.router.navigate(['/login'])
    }
  }

  in_development(){
    this.toast.info({detail:"Info Message",summary:"This plan is under devlopment",duration:5000});
  }

  check_plan(){
    this.cup.check_user_plan(localStorage.getItem("email")).subscribe((response:any)=>{
      if(response.user_current_plan.plan==="Null"){
        console.log("you need to buy plan in order to get multiple insta accounts insights");
      }
      else{
        console.log("create five insta allotments for the user");
        this.cfi.create_five_insta_allotments_for_the_user().subscribe((res)=>{
          console.log("response=",res);
        })
      }
    })
  }

  freelancer_package(data:any) {
    let email=localStorage.getItem("email");
    this.cup.check_user_plan(email).subscribe((response:any)=>{
      if(response.user_current_plan.plan==="Null"){
        if(localStorage.getItem('email')){
          console.log("freelancer checkout button working fine");
          this.checkout.checkout_service(data).subscribe((res)=>{
            window.location.href =<any>[Object.entries(res)[0][1]];
          });
        }
      }
      else{
        this.toast.warning({detail:"Warning Message",summary:"You already have this suscription",duration:5000});
      }
    })
  }
}
