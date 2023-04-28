import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private http: HttpClient) { }

  update_profile(req:any){
    console.log("request from edit profile=",req);
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.post(environment.baseURL+"/update_profile",{"email":localStorage.getItem("email"),"location":req.location,"website":req.website,"first_name":req.first_name,"last_name":req.last_name,"about_me":req.about_me,"occupation":req.occupation},{headers});
  }
}
