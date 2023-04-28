import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
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
