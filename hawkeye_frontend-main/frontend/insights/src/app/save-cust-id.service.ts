import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveCustIdService {

  constructor(private http:HttpClient) { }

  save_cust_id(email:any,ci:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.baseURL+'/save_cust_id',{"email":email,"ci":ci},{headers});
  }
}
