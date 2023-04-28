import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor(private http: HttpClient) { }
  set_image(pi:any){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.post(environment.baseURL+'/set-profile-image',({"profile_image":pi,"email":localStorage.getItem("email")}),{headers})
  }
  get_profile_image(){
    let headers = new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.post(environment.baseURL+'/get-profile-image',({"email":localStorage.getItem("email")}),{headers})
  }
}
