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
  showOrHideMonthList: boolean = false;
  showOrHideAmountMode: boolean = false;
  monthArray: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth: string = this.monthArray[new Date().getMonth()];
  selectedAmountMode: string = "All";
  showOrHideCryptoType: boolean = false;
  selectedCurrencyType: string = "BTC";
  activityListArr: any[] = [];
  dayWeekMonth: string = "toady";
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
    let amountMode: string;
    let jsonData = {};
    if (this.selectedAmountMode == "All") {
      amountMode = "All";
    } else if (this.selectedAmountMode == "Received") {
      amountMode = "Received";
    } else if (this.selectedAmountMode == "Paid") {
      amountMode = "send";
    }
    if (this.selectedCurrencyType == "BTC") {
      jsonData = {
        "userId": 34,
        "fetchAmountFlag": amountMode,
        "cryptoType": "BTCTEST",
        "flagfordates": this.dayWeekMonth
      }
    } else {
      jsonData = {
        "userId": 34,
        "fetchAmountFlag": amountMode,
        "cryptoType": "ETH",
        "flagfordates": this.dayWeekMonth
      }
    }

    this.dashboardService.postActivityList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.activityListArr = success['listCalculatingAmountDTO'];
        console.log("activity list", this.activityListArr);
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

