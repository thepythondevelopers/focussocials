import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  toDisplay_navabar2: boolean=false;

  constructor() { 
    if(localStorage.getItem("email")){
      this.toDisplay_navabar2=false;
    }
    else{
      this.toDisplay_navabar2=true;
    }
  }

  ngOnInit(): void {
  }

}
