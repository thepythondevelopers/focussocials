import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentListService } from '../payment-list.service';
import {environment} from '../../environments/environment';
import { ListSubscriptionService } from '../list-subscription.service';
import { SaveSubscriptionService } from '../save-subscription.service';
import { SaveCustIdService } from '../save-cust-id.service';
import { SendEmailService } from '../send-email.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css','../login-with-facebook/login-with-facebook.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private se:SendEmailService,private sci:SaveCustIdService,private sub_id:SaveSubscriptionService,private ls:ListSubscriptionService,private http : HttpClient,private router : Router, private payment_list:PaymentListService) {
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`); 
    this.http.post(environment.baseURL+'/get_plans',{"email":localStorage.getItem('email')},{headers}).subscribe((response)=>{
      let my_plan = Object.entries(response)[0][1];
      console.log("My plan=",my_plan);
      if(my_plan==='Null'){
        this.payment_list.list().subscribe((res:any)=>{
          console.log("response from payment list::",res);
          let customer=res.data[0].customer;
          console.log("customer=",customer)
          this.payment_list.customer_details(customer).subscribe((resp:any)=>{
          let email=resp.email;
          console.log("email",email);
          let amount=res.data[0].amount_received;
          console.log("amount=",amount);
          let creation_date=res.data[0].created;
          console.log("creation_date=",creation_date);
          let description=res.data[0].description;
          console.log("description=",description);
          let status=res.data[0].status;
          console.log("status=",status);
          if(status==="succeeded"){
            this.ls.list_subscription(customer).subscribe((res_data)=>{
              let si=Object.entries(res_data)[1][1][0].id
              console.log("si::",si);
              this.sub_id.save_subscription(localStorage.getItem("email"),si).subscribe((response_data)=>{
                console.log("save subscription::",response_data);
              })
            })
            this.sci.save_cust_id(localStorage.getItem("email"),customer).subscribe((res_data)=>{
              console.log("reponse from save cust_id::",res_data);
            })
          this.se.send_email(localStorage.getItem("email"),"purchased").subscribe((email_res)=>{
            console.log("response from mail::",email_res);
          })
          }
          let date=new Date();
          let latest_date_in_unix=Math.floor(date.getTime() / 1000);
          console.log("latest date=",latest_date_in_unix);
          if(amount===1900||amount===2400||amount===3400 && description==='Subscription creation' && status==="succeeded" && email===localStorage.getItem('email')){
            if((latest_date_in_unix-creation_date)<2678400){
              this.payment_list.save_subscription({"amount":amount,"email":email}).subscribe((res)=>{
                console.log("suscription susccessfull")
              });
            }
            else{
              alert('Please Buy a plan first');
              this.router.navigate(['/pricing']);
            }
          }
          })
        })
      }
    })
  }

  ngOnInit(): void {
  }
  connect_to_fb(){
    this.router.navigate(['/pricing']); 
  }
}
