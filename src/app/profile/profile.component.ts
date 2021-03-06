import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class ProfileComponent implements OnInit {
  profileImageSrc: any;
  profileForm: FormGroup;
  countryListArr: any = [];
  currentEthAmount: string | number;
  currentBtcAmount: string | number;
  currentEthAmountStatus: number;
  currentBtcAmountStatus: |number;
  optOne: any;
  optTwo: any;
  optThree: any;
  optFour: any;
  optFive: any;
  optSix: any;
  twoFactorShowOrHide: boolean = false;
  profileShowOrHide: boolean = true;
  otpShowOrHide: boolean = false;
  initialStatus: string;
  enableOrDisable: string;
  profileUploadCounter: number = 0;
  uploadProfileImg: any;
  checkMobileLength: boolean = false;
  mobileNo: number;
  clock_tick: any = Date.now();

  @ViewChild('profileImage') profileImage: ElementRef;
  @ViewChild("factorToggle") factorToggle: ElementRef;
  @ViewChildren('otpElement') otpElement: QueryList<ElementRef>;
  // @ViewChild('profileImage') uploadImages: ElementRef;

  // selectedCountry:any;
  constructor(private dashboardService: CommonDashboardService, private formBuilder: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      
    })

    this.profileForm = this.formBuilder.group({
      "name": ['', Validators.required],
      "mobile": ['', Validators.required],
      "registry": [{ value: '', disabled: true }, Validators.required],
      "country": [{ value: '', disabled: true }, Validators.required],
      "email": [{ value: '', disabled: true }, Validators.required],
      "coinPurse": [{ value: '', disabled: true }, Validators.required],
      "version": [{ value: '', disabled: true }, Validators.required],
    })


    this.getProfileDetails("initial");
    // this.getBtcOrEthBalance();
  }

  // ngOnDestroy(){
  //   sessionStorage.setItem("active","profile");
  // }



  getProfileDetails(where?: string) {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId")
    }
    this.dashboardService.postProfileDetails(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        if (where == "initial") {
          this.getCountryDetails();
        }
        this.profileForm.controls.name.setValue(success['retrieveData'].firstName +" "+ success['retrieveData'].lastName);
        this.profileForm.controls.country.setValue(success['retrieveData'].countryName);
        this.profileForm.controls.email.setValue(success['retrieveData'].email);
        this.profileForm.controls.mobile.setValue(success['retrieveData'].mobileNo);
        this.profileImageSrc = "";
        if (!success['retrieveData'].hasOwnProperty('proImgPath')) {
          this.profileImageSrc = "assets/images/profile.jpg";
        } else {
          this.profileImageSrc = success['retrieveData'].proImgPath;
        }


        if (where == "initial") {
          this.getBtcOrEthBalance();
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



  getCountryDetails() {
    this.spinner.showOrHide(true);

    this.dashboardService.getCountryList().subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.countryListArr = success['countryData'];
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


  updateProfileDetails() {
    if (this.profileForm.controls.name.invalid || this.profileForm.controls.mobile.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else if (this.checkMobileLength) {
      Swal.fire("Info", "Mobile no must be more than 7 and less than 15", "info");
    } else {
      this.spinner.showOrHide(true);
      let jsonData = {
        "mobileNo": this.profileForm.controls.mobile.value,
        "userName": this.profileForm.controls.name.value,
        "userId": sessionStorage.getItem("userId")
      }
      // let formData = new FormData();
      // if (this.profileUploadCounter > 0) {

      //   formData.set("mobileNo", this.profileForm.controls.mobile.value);
      //   formData.set("userName", this.profileForm.controls.name.value);
      //   formData.set("userId", sessionStorage.getItem("userId"));
      //   formData.set("profileimg", this.uploadProfileImg);

      // } else {
      //   formData.set("mobileNo", this.profileForm.controls.mobile.value);
      //   formData.set("userName", this.profileForm.controls.name.value);
      //   formData.set("userId", sessionStorage.getItem("userId"));
      // }
      this.dashboardService.postUpdateProfileDetails(jsonData).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.getProfileDetails();
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

  onSelectProfileImage(files: any) {
    this.uploadProfileImg = files[0];
    this.profileUploadCounter++;
    let reader = new FileReader();
    // this.profileImageSrc = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profileImageSrc = reader.result;
    }
  }


  showEnableOrDisable() {
    this.profileShowOrHide = false;
    this.twoFactorShowOrHide = true;
    this.getEnableOrDisable("initial");
  }


  uploadProfileImgage(images: any, files: any) {
    let extension = files[0].name.split(".");
    if (extension[extension.length - 1] == "png" || extension[extension.length - 1] == "jpeg" || extension[extension.length - 1] == "jpg" || 
    extension[extension.length - 1] == "PNG" || extension[extension.length - 1] == "JPEG" || extension[extension.length - 1] == "JPG") {
      this.spinner.showOrHide(true);
      let formData = new FormData();
      formData.set("profileimg", files[0]);
      formData.set("userId", sessionStorage.getItem("userId"));
      this.dashboardService.postUploadProImages(formData).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          // this.profileImageSrc = "";
          this.clock_tick = Date.now();
          this.profileImageSrc = success['profilePath'];
          Swal.fire("Success", success['message'], "success");
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

    } else {
      Swal.fire("Info", "Extension must be png,jpeg,jpg", "info");
    }



  }


  toggleEnableDisable() {
    if (this.factorToggle.nativeElement.className == "btn btn-lg btn-toggle focus") {
      this.factorToggle.nativeElement.className = "btn btn-lg btn-toggle active focus";
    } else if (this.factorToggle.nativeElement.className == "btn btn-lg btn-toggle active focus") {
      this.factorToggle.nativeElement.className = "btn btn-lg btn-toggle focus";
    }
    this.getEnableOrDisable('click');
  }

  getEnableOrDisable(when: string) {

    this.initialStatus = when;
    let otp = String(this.optOne) + String(this.optTwo) + String(this.optThree) + String(this.optFour) + String(this.optFive) + String(this.optSix);

    let jsonData = {};
    if (this.initialStatus == "initial") {
      this.otpShowOrHide = false;
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
          if (success['message'] == "2 Factor Authentication Status updated successfully") {
            this.profileShowOrHide = true;
            this.twoFactorShowOrHide = false;
          }
          Swal.fire("Success", success['message'], "success");
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


  getBtcOrEthBalance() {
    // let currency = cryptoCurrency;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": "BTC"
    }
    this.dashboardService.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.currentEthAmount = success['CalculatingAmountDTO'].currentUsdforEther;
        this.currentBtcAmount = success['CalculatingAmountDTO'].currentUsdforBtc;
        this.currentEthAmountStatus = success['CalculatingAmountDTO'].ethStatus;
        this.currentBtcAmountStatus = success['CalculatingAmountDTO'].btcStatus;

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

  twoFactorClicked() {
    this.profileShowOrHide = false;
    this.twoFactorShowOrHide = true;
  }

  avoidPaste() {
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


  
  checkMobileLengthFun(num: any) {
    if (Boolean(num)) {
      (num.toString().length > 15 || num.toString().length < 7) ? this.checkMobileLength = true : this.checkMobileLength = false;
    }


  }


  avoidNumber(e: any) {
    if (["e", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }

    // if (this.profileForm.controls.mobile.value != null) {
    //   (this.profileForm.controls.mobile.value.toString().length > 15 || this.profileForm.controls.mobile.value.toString().length < 7) ? this.checkMobileLength = true : this.checkMobileLength = false;
    // }

  }


}
