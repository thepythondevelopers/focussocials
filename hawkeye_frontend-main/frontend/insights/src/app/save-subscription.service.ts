import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveSubscriptionService {

  constructor(private http:HttpClient) { }

  save_subscription(data:any,si:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.baseURL+'/save_subscription_id',{"email":data,"sub_id":si},{headers});
  }
}
