import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  toDisplaymodal: any=false;
  cb: boolean=false;
  eye: boolean=false;
  eye2: boolean=false;
  constructor(private toast:NgToastService, private router : Router, private signup : SignupService) { 
    if(localStorage.getItem("email")){
      this.router.navigate(['/dashboard']);
    }
  }
  close_modal(){
    this.toDisplaymodal=false;
  }
  signupdata(data:any){
    if(this.cb===true)
    this.signup.signup(data);
    else
    this.toast.error({detail:"Failure Message",summary:"Please accept the terms and condition to continue",duration:5000});
  }
  checkbox(){
    this.toDisplaymodal=true;
    this.cb=!this.cb;
  }
  eyeone(){
    this.eye=!this.eye;
  }
  eyetwo(){
    this.eye2=!this.eye2;
  }
  ngOnInit(): void {
  }
}
