import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class AdminDashboardComponent implements OnInit {
  qrCodeClassShowOrHide: boolean = false;
  qrCodeModalShowOrHide: boolean = false;


  constructor() { }

  ngOnInit() {
  }
  requestCryptoCurrency() {

  }
  qrCodeModalOpenOrClose() {

  }
}
