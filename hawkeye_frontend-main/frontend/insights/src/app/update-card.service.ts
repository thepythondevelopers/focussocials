import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateCardService {

  constructor(private http:HttpClient) { }

  list_card(data:any){
    return this.http.post(environment.baseURL+'/list_cards',{"ci":data});
  }
  update_card(ci:any,card_id:any,cust_name:any){
    return this.http.post(environment.baseURL+'/update_card',{"cust_id":ci,"card_id":card_id,"name":cust_name});
  }
}
