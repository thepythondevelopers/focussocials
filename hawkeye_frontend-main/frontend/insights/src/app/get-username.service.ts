import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUsernameService {

  constructor(private http: HttpClient) { }

  gsn(ig_id:any,access_token:any){
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'?fields=username&access_token='+access_token)
  }
}
