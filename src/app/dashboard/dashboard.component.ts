import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: NgxSpinnerService, private dashboardService: CommonDashboardService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

  }


  goToKyc() {
    this.route.navigate(['dashboard/kyc']);
  }

  goToHomeAddress() {
    this.route.navigate(['dashboard/homeaddress']);
  }

}

