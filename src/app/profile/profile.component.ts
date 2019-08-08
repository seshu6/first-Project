import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  // selectedCountry:any;
  constructor(private dashboardService: CommonDashboardService, private formBuilder: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
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
        this.profileForm.controls.name.setValue(success['retrieveData'].userName);
        this.profileForm.controls.email.setValue(success['retrieveData'].email);
        this.profileForm.controls.mobile.setValue(success['retrieveData'].mobileNo);
        this.profileImageSrc = success['retrieveData'].proImgPath;
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

  profileUploadCounter: number = 0;
  uploadProfileImg: any;
  updateProfileDetails() {
    if (this.profileForm.controls.name.invalid || this.profileForm.controls.mobile.invalid) {
      Swal.fire("Info", "Please chaeck your data", "info");
    } else {
      this.spinner.showOrHide(true);
      let formData = new FormData();
      if (this.profileUploadCounter > 0) {

        formData.set("mobileNo", this.profileForm.controls.mobile.value);
        formData.set("userName", this.profileForm.controls.name.value);
        formData.set("userId", sessionStorage.getItem("userId"));
        formData.set("profileimg", this.uploadProfileImg);

      } else {
        formData.set("mobileNo", this.profileForm.controls.mobile.value);
        formData.set("userName", this.profileForm.controls.name.value);
        formData.set("userId", sessionStorage.getItem("userId"));
      }
      this.dashboardService.postUpdateProfileDetails(formData).subscribe(success => {
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


}
