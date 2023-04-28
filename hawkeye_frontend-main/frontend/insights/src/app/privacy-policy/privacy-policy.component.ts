import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  toDisplay_sidebar=false;

  constructor() { 
    if(localStorage.getItem("email")){
      this.toDisplay_sidebar=true;
    }
    else{
      this.toDisplay_sidebar=false;
    }
  }

  ngOnInit(): void {
  }

}
