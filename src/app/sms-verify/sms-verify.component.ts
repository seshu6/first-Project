import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';

@Component({
  selector: 'app-sms-verify',
  templateUrl: './sms-verify.component.html',
  styleUrls: ['./sms-verify.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class SmsVerifyComponent implements OnInit {
  enableOrDisable: string;
  initialStatus: string;
  btcOrEth: string | number;
  btcOrEthBalance: string | number;
  btcOrEthBalanceUsd: string | number;
  profileStatus: any;
  optOne: any;
  optTwo: any;
  optThree: any;
  optFour: any;
  optFive: any;
  optSix: any;
  otpShowOrHide: boolean = false;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private dashboardService: CommonDashboardService, private spinner: LoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

    this.getEnableOrDisable("initial");

  }
  goToHomeAddress() {
    this.route.navigate(['homeaddress']);
  }
  getBtcOrEthBalance(crypto: string | number) {
    this.btcOrEth = crypto;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": this.btcOrEth
    }
    this.dashboardService.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.profileStatus = success['CalculatingAmountDTO'].profileStatus;
        if (this.btcOrEth == "ETH") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].etherAmount;
          this.btcOrEthBalanceUsd = success['CalculatingAmountDTO'].usdforEther;
        } else {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].btcAmount;
          this.btcOrEthBalanceUsd = success['CalculatingAmountDTO'].usdforBtc;
        }

      } else if (success['status'] == "failure") {

      }

    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })

  }

  // showOtp(){
  //   this.otpShowOrHide = true;
  // }

  getEnableOrDisable(when: string) {

    this.initialStatus = when;
    let otp = String(this.optOne) + String(this.optTwo) + String(this.optThree) + String(this.optFour) + String(this.optFive) + String(this.optSix);
    let jsonData = {};
    if (this.initialStatus == "initial") {
      jsonData = {
        "userId": sessionStorage.getItem("userId")
      }
    }
    else if (this.otpShowOrHide) {
      if (otp.toString().length != 6) {
        Swal.fire("Info", "Please check your OTP", "info");
        return false;
      } else {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "twoFactorAuthenticationStatus": (this.enableOrDisable == "Enable") ? 1 : 0,
          "otpSecureKey": otp
        }
      }

    }
    else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "twoFactorAuthenticationStatus": (this.enableOrDisable == "Enable") ? 1 : 0
      }
    }
    this.spinner.showOrHide(true);
    this.dashboardService.postEnableOrDisable(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        (success['twoFactorStatus'] == 1) ? this.enableOrDisable = "Enable" : this.enableOrDisable = "Disable";
        if (this.initialStatus != "initial") {
          this.optOne = "";
          this.optTwo = "";
          this.optThree = "";
          this.optFour = "";
          this.optFive = "";
          this.optSix = "";
          (this.otpShowOrHide) ? this.otpShowOrHide = false : this.otpShowOrHide = true;
          Swal.fire("Success", success['message'], "success");
        } else {
          this.getBtcOrEthBalance("BTC");
        }
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

  avoidCopyAndPaste() {
    return false;
  }

  checkTwoFactorOtp(otp: number) {

  }
}
