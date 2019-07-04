import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-and-policies',
  templateUrl: './privacy-and-policies.component.html',
  styleUrls: ['./privacy-and-policies.component.css']
})
export class PrivacyAndPoliciesComponent implements OnInit {
  showOrHideLegalAndPolicies:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
