import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
@Component({
  selector: 'app-privacy-and-policies',
  templateUrl: './privacy-and-policies.component.html',
  styleUrls: ['./privacy-and-policies.component.css']
})
export class PrivacyAndPoliciesComponent implements OnInit {
  showOrHideLegalAndPolicies:boolean = true;
  constructor() { }

  ngOnInit() {
    $("html body").animate({scrollTop:0});
  }

}
