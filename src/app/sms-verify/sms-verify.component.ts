import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sms-verify',
  templateUrl: './sms-verify.component.html',
  styleUrls: ['./sms-verify.component.css']
})
export class SmsVerifyComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  goToHomeAddress() {
    this.route.navigate(['dashboard/homeaddress']);
  }
}
