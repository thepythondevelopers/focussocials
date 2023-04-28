import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListSubscriptionService {

  constructor(private http: HttpClient) { }

  list_subscription(data:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.baseURL+'/list_subscription',{"ci":data},{headers});
  }

}
