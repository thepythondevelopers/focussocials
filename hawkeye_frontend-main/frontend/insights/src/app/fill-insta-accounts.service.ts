import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FillInstaAccountsService {

  constructor(private http: HttpClient) { }

  fill_insta_accounts(email:any,access_token:any,ig_id:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`);
    return this.http.post(environment.baseURL+'/fill_insta_accounts',{"email":email,"access_token":access_token,"ig_id":ig_id},{headers});
  }
}
