import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonDashboardService } from '../common-dashboard.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';


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
  profileShowOrHide: boolean = false;
  selectedDate: any = new Date();
  selectedCountry: string;
  selectedCity: string;
  selectedstate: string;
  selectedCountryAddress: string;
  countryListArr: any[] = [];
  stateListArr: any[] = [];
  cityListArr: any[] = [];
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,private formBuilder: FormBuilder, private dashboardServices: CommonDashboardService, private spinner: NgxSpinnerService, private route: Router) { }

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


  validateCountrySearch() {
    if (this.homeAddressForm.controls.countrySearch.invalid) {
      Swal.fire("Info", "Please enter country to proceed", "info");
    } else {
      this.addressShowOrHide = !this.addressShowOrHide;
    }
  }

  validateAddressDetails() {
    if (this.homeAddressForm.controls.addressLine1.invalid || this.homeAddressForm.controls.addressLine2.invalid
      || this.homeAddressForm.controls.city.invalid || this.homeAddressForm.controls.state.invalid
      || this.homeAddressForm.controls.country.invalid || this.homeAddressForm.controls.postalCode.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.profileShowOrHide = !this.profileShowOrHide;
    }
  }

  addHomeAddressForm() {
    console.log("selected date", this.selectedDate);
    if (this.homeAddressForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.show();
      let jsonData = {
        "address": this.homeAddressForm.controls.addressLine1.value,
        "address1": this.homeAddressForm.controls.addressLine1.value,
        "postalCode": this.homeAddressForm.controls.addressLine1.value,
        "countryId": this.selectedCountryAddress,
        "stateId": this.selectedstate,
        "cityId": this.selectedCity,
        "userId": sessionStorage.getItem("userId"),
        "firstName": this.homeAddressForm.controls.addressLine1.value,
        "middleName": this.homeAddressForm.controls.addressLine1.value,
        "lastName": this.homeAddressForm.controls.addressLine1.value,
        "dateOfBirth": this.homeAddressForm.controls.addressLine1.value
      }
      this.dashboardServices.postAddHomeAddressDetails(jsonData).subscribe(success => {
        this.spinner.hide();
        if (success['status'] == "success") {
          this.homeAddressForm.reset();
          Swal.fire("Success", success['message'], "success");
          this.route.navigate(['dashboard']);

        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }

      }, error => {
        this.spinner.hide();
      })
    }
  }


  // GET COUNTRY DETAILS API
  getCountryList() {
    this.spinner.show();

    this.dashboardServices.getCountryList().subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        this.countryListArr = success['countryData'];
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }


  // GET STATE DETAILS API
  getStateList() {
    this.spinner.show();
    let jsonData = {
      "countryid": this.selectedCountryAddress
    };
    this.dashboardServices.postStateList(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        this.stateListArr = success['StateData'];
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }


  // GET CITY DETAILS API
  getCityList() {
    this.spinner.show();
    let jsonData = {
      "stateid": this.selectedstate
    };
    this.dashboardServices.postCityList(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        this.cityListArr = success['CityData'];
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }

}
