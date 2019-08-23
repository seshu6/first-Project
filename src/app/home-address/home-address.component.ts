import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonDashboardService } from '../common-dashboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-home-address',
  templateUrl: './home-address.component.html',
  styleUrls: ['./home-address.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class HomeAddressComponent implements OnInit {
  homeAddressForm: FormGroup;
  addressShowOrHide: boolean = false;
  profileShowOrHide: boolean = true;
  countryResidenceShowOrHide: boolean = false;
  selectedDate: any = new Date();
  selectedCountry: string;
  selectedCity: string;
  selectedstate: string;
  selectedCountryAddress: string;
  countryListArr: any[] = [];
  stateListArr: any[] = [];
  cityListArr: any[] = [];
  btcOrEth: string | number;
  btcOrEthBalance: string | number;
  btcOrEthBalanceUsd: string | number;
  // min = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  max = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private formBuilder: FormBuilder, private dashboardServices: CommonDashboardService, private spinner: LoaderService, private route: Router) { }

  ngOnInit() {
    this.homeAddressForm = this.formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      countrySearch: ['', Validators.required],
      postalCode: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

    this.getCountryList();
    this.getBtcOrEthBalance("BTC");
  }


  // moveToProfileDetails() {
  //   if (this.homeAddressForm.controls.addressLine1.invalid || this.homeAddressForm.controls.addressLine2.invalid
  //     || this.homeAddressForm.controls.city.invalid || this.homeAddressForm.controls.state.invalid
  //     || this.homeAddressForm.controls.country.invalid || this.homeAddressForm.controls.postalCode.invalid
  //     || this.homeAddressForm.controls.countrySearch.invalid) {
  //     Swal.fire("Info", "Please check your data", "info");
  //   } else {
  //     this.addressShowOrHide = !this.addressShowOrHide;
  //   }
  // }

  getBtcOrEthBalance(crypto: string | number) {
    this.btcOrEth = crypto;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": this.btcOrEth
    }
    this.dashboardServices.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
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

  validateCountrySearch() {
    if (this.homeAddressForm.controls.countrySearch.invalid) {
      Swal.fire("Info", "Please enter country to proceed", "info");
    } else {
      // this.addressShowOrHide = !this.addressShowOrHide;
      this.addHomeAddressForm();
    }
  }

  validateAddressDetails() {
    if (this.homeAddressForm.controls.addressLine1.invalid || this.homeAddressForm.controls.addressLine2.invalid
      || this.homeAddressForm.controls.city.invalid || this.homeAddressForm.controls.state.invalid
      || this.homeAddressForm.controls.country.invalid || this.homeAddressForm.controls.postalCode.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.countryResidenceShowOrHide = !this.countryResidenceShowOrHide;
    }
  }

  validateNameDetails() {
    if (this.homeAddressForm.controls.firstName.invalid || this.homeAddressForm.controls.lastName.invalid
      || this.homeAddressForm.controls.middleName.invalid || this.homeAddressForm.controls.dateOfBirth.invalid) {
      Swal.fire("Info", "Please check your data", "info"); 
    } else {
      this.addressShowOrHide = !this.addressShowOrHide;
    }
  }

  addHomeAddressForm() {
    console.log("selected date", this.selectedDate);
    if (this.homeAddressForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.showOrHide(true);
      let jsonData = {
        "address": this.homeAddressForm.controls.addressLine1.value,
        "address1": this.homeAddressForm.controls.addressLine2.value,
        "postalCode": this.homeAddressForm.controls.postalCode.value,
        "countryId": this.selectedCountryAddress,
        "stateId": this.selectedstate,
        "cityId": this.selectedCity,
        "userId": sessionStorage.getItem("userId"),
        "firstName": this.homeAddressForm.controls.firstName.value,
        "middleName": this.homeAddressForm.controls.middleName.value,
        "lastName": this.homeAddressForm.controls.lastName.value,
        "dateOfBirth": this.homeAddressForm.controls.dateOfBirth.value
      }
      this.dashboardServices.postAddHomeAddressDetails(jsonData).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          // this.homeAddressForm.reset();
          Swal.fire("Success", success['message'], "success");
          this.route.navigate(['dashboard']);

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




  // GET COUNTRY DETAILS API
  getCountryList() {
    this.spinner.showOrHide(true);

    this.dashboardServices.getCountryList().subscribe(success => {
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


  // GET STATE DETAILS API
  getStateList() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "countryid": this.selectedCountryAddress
    };
    this.dashboardServices.postStateList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.stateListArr = success['StateData'];
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

  


  // GET CITY DETAILS API
  getCityList() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "stateid": this.selectedstate
    };
    this.dashboardServices.postCityList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.cityListArr = success['CityData'];
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
