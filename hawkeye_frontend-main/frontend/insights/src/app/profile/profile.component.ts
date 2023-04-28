import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileImageService } from '../profile-image.service';
import {NgToastService} from 'ng-angular-popup'
import { UpdateProfileService } from '../update-profile.service';
import { UserDetailsService } from '../user-details.service';
import { UpdateProfileImageService } from '../update-profile-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile_image: any;
  base64String:any;
  sdp: any=false;
  show_edit_box: any=false;
  imageurl: string="";
  fname: any;
  lname: any;
  website: any;
  about_me: any;
  occupation: any;
  location: any;
  email: any;
  images: any;
  file: any;
  constructor(private ui: UpdateProfileImageService,private ud:UserDetailsService,private up: UpdateProfileService,private toast:NgToastService,private router: Router,private pis: ProfileImageService) {
    
    this.pis.get_profile_image().subscribe((res)=>{
      console.log("profile image=",Object.entries(res)[0][1].data.length);
      if(Object.entries(res)[0][1].data.length>0){
        let TYPED_ARRAY = new Uint8Array(Object.entries(res)[0][1].data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '')
          let base64String = btoa(STRING_CHAR);
          this.imageurl = 'data:image/jpg;base64, ' + base64String;
      }
      else{
        this.sdp=true;
        console.log("sdp="+this.sdp);
      }
    })
    this.ud.get_user_details().subscribe((res)=>{
      console.log("user details=",Object.entries(res));
      this.fname=Object.entries(res)[0][1].fname;
      this.lname=Object.entries(res)[0][1].lname;
      this.website=Object.entries(res)[0][1].website;
      this.about_me=Object.entries(res)[0][1].about_me;
      this.occupation=Object.entries(res)[0][1].occupation;
      this.location=Object.entries(res)[0][1].location;
      this.email=Object.entries(res)[0][1].email;
    })
  }

  ngOnInit(): void {
  }
  edit_profile(){
    this.show_edit_box=true;
    this.email=localStorage.getItem('email');
  }
  cancel(){
    this.show_edit_box=false;
  }

  selectImage(event:any){
    if(event.target.files.length>0){
       this.file=event.target.files[0];
      this.images=this.file;
      console.log("type of image file::",this.file.type)


    }
  }

  edit_profile_data(data:any){
    console.log("form data=",data);
    if(!data.first_name){
      this.toast.error({detail:"Failure Message",summary:"First name cannot be left empty",duration:5000});
    }
    else if(!data.last_name){
      this.toast.error({detail:"Failure Message",summary:"Last name cannot be left empty",duration:5000});
    }
    else if(!data.website){
      this.toast.error({detail:"Failure Message",summary:"Website cannot be left empty",duration:5000});
    }
    else if(!data.location){
      this.toast.error({detail:"Failure Message",summary:"Location cannot be left empty",duration:5000});
    }
    else if(!data.occupation){
      this.toast.error({detail:"Failure Message",summary:"Occupation cannot be left empty",duration:5000});
    }
    else if(!data.about_me){
      this.toast.error({detail:"Failure Message",summary:"About me cannot be left empty",duration:5000});
    }
    else{
      try {
        new URL(data.website);
        if(this.file){
          if(this.file.type==="image/jpeg" || this.file.type==="image/png"){
            this.up.update_profile(data).subscribe((res:any)=>{
              console.log("response from update profile=",res);
              if(res.msg==="Profile updated Successfull"){
                const formData=new FormData();
                formData.append('image',this.images);
                formData.append('email',res.email)
                this.ui.update_image(formData).subscribe((response)=>{
                  console.log("response=",Object.entries(response))
                  if(Object.entries(response)[0][1]==="Profile image updated Successfull"){
                    this.toast.success({detail:"Success Message",summary:"Profile update Successfully",duration:5000});
                    window.location.reload();
                  }
                  else{
                    this.toast.error({detail:"Failure Message",summary:"Updating profile image failed",duration:5000});
                  }
                })
              }
              else{
                this.toast.error({detail:"Failure Message",summary:"Updating profile failed",duration:5000});
              }
            })
          }
          else{
            this.toast.error({detail:"Failure Message",summary:"Invalid image format only png or jpeg format is accepted",duration:5000});
          }
        }
        else{
          this.up.update_profile(data).subscribe((res:any)=>{
            if(res.msg==="Profile updated Successfull"){
                  this.toast.success({detail:"Success Message",summary:"Profile update Successfully",duration:5000});
                  window.location.reload();
            }
            else{
              this.toast.error({detail:"Failure Message",summary:"Updating profile failed",duration:5000});
            }
          })
        }
      } catch (err) {
        this.toast.error({detail:"Failure Message",summary:"Invalid website url",duration:5000});
      }
    }
  }
}
