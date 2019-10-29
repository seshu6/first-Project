import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

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
  @ViewChild("factorToggle") factorToggle: ElementRef;
  @ViewChildren('otpElement') otpElement: QueryList<ElementRef>;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private dashboardService: CommonDashboardService, private spinner: LoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {

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
        } else if (this.btcOrEth == "BWN") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].bwnAmount;
          this.btcOrEthBalanceUsd = success['CalculatingAmountDTO'].usdForBwn;
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

  toggleEnableDisable() {
    if (this.factorToggle.nativeElement.className == "btn btn-lg btn-toggle focus") {
      this.factorToggle.nativeElement.className = "btn btn-lg btn-toggle active focus";
    } else if (this.factorToggle.nativeElement.className == "btn btn-lg btn-toggle active focus") {
      this.factorToggle.nativeElement.className = "btn btn-lg btn-toggle focus";
    }
    this.getEnableOrDisable('click');
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
    } else if (this.otpShowOrHide) {
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

    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "twoFactorAuthenticationStatus": (this.enableOrDisable == "Enable") ? 1 : 0
      }
    }
    this.spinner.showOrHide(true);
    this.dashboardService.postEnableOrDisable(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        if (success['twoFactorStatus'] == 1) {

          this.enableOrDisable = "Enable"
          this.factorToggle.nativeElement.className = "btn btn-lg btn-toggle active focus";
        } else {
          this.enableOrDisable = "Disable";
          this.factorToggle.nativeElement.className = "btn btn-lg btn-toggle focus";
        }
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

  copyOtp(otpNo: any) {
    let copiedOtpArr = otpNo.clipboardData.getData("Text").split("");
    if (copiedOtpArr.length == 6) {
      this.optOne = copiedOtpArr[0];
      this.optTwo = copiedOtpArr[1];
      this.optThree = copiedOtpArr[2];
      this.optFour = copiedOtpArr[3];
      this.optFive = copiedOtpArr[4];
      this.optSix = copiedOtpArr[5];
    } else {
      this.optOne = "";
      this.optTwo = "";
      this.optThree = "";
      this.optFour = "";
      this.optFive = "";
      this.optSix = "";
      Swal.fire("Info", "Please check OTP length", "info");
    }
    return false;

  }

  allowOnlyNumber(number: any, e: any, index: number) {
    if (number != null) {
      if (["e", "+", "-"].includes(e.key)) {
        e.preventDefault();
      } else if (number.toString().length >= 1) {
        e.preventDefault();
        this.otpElement['first']['nativeElement']['children'][index].focus();
        // return false;
      } else {
        this.otpElement['first']['nativeElement']['children'][index].focus();
      }
    } else {
      if (["e", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }
    }


  }

  goToLoginPage() {
    this.route.navigate(['login']);
  }
}
