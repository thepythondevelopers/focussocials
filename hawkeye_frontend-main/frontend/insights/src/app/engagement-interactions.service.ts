import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngagementInteractionsService {

  constructor(private http:HttpClient) { }

  engagement(access_token:any,media_id:any){
    let url="https://graph.facebook.com/v15.0/"+media_id+"/insights?metric=engagement&access_token="+access_token;
    return this.http.get(url);
  }
  interaction(access_token:any,media_id:any){
    let url="https://graph.facebook.com/v15.0/"+media_id+"/insights?metric=total_interactions&access_token="+access_token;
    return this.http.get(url);
  }
}
