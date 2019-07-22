import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  qrCodeModalShowOrHide: boolean = false;
  qrCodeClassShowOrHide: boolean = false;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private dashboardService: CommonDashboardService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

    this.dashboardService.communicationObservable$.subscribe(() => {
      this.qrCodeModalShowOrHide = !this.qrCodeModalShowOrHide;
      this.qrCodeClassShowOrHide = !this.qrCodeClassShowOrHide;

    })


    this.getActivityList();
  }


  goToKyc() {
    this.route.navigate(['dashboard/kyc']);
  }

  goToSmsVerify() {
    this.route.navigate(['dashboard/verify']);
  }

  requestCryptoCurrency() {
    this.qrCodeModalShowOrHide = !this.qrCodeModalShowOrHide;
    this.qrCodeClassShowOrHide = !this.qrCodeClassShowOrHide;
  }


  getActivityList() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": 34,
      "fetchAmountFlag": "All",
      "cryptoType": "BTCTEST",
      "flagfordates": "month"
    }
    this.dashboardService.postActivityList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        console.log("activity list", success);
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }
}

