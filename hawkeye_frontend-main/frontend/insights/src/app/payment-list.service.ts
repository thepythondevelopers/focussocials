import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  constructor(private http: HttpClient) { }

  list(){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    let url=environment.baseURL+'/payment_lists';
    return this.http.get(url,{headers});
  }
  customer_details(req:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.baseURL+'/customer_details',({"customer":req}),{headers});
  }
  save_subscription(req:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.baseURL+'/save_subscription',({"amount":req.amount,"email":req.email}),{headers});
  }
}
