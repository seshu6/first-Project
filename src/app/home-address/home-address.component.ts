import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonDashboardService } from '../common-dashboard.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home-address',
  templateUrl: './home-address.component.html',
  styleUrls: ['./home-address.component.css']
})
export class HomeAddressComponent implements OnInit {
  homeAddressForm: FormGroup;
  profileAndCountryShowOrHide: boolean = false;
  constructor(private formBuilder: FormBuilder, private dashboardServices: CommonDashboardService, private spinner: NgxSpinnerService, private route: Router) { }

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
  }


  moveToProfileDetails() {
    if (this.homeAddressForm.controls.addressLine1.invalid || this.homeAddressForm.controls.addressLine2.invalid
      || this.homeAddressForm.controls.city.invalid || this.homeAddressForm.controls.state.invalid
      || this.homeAddressForm.controls.country.invalid || this.homeAddressForm.controls.postalCode.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.profileAndCountryShowOrHide = !this.profileAndCountryShowOrHide;
    }
  }


  addHomeAddressForm() {
    if (this.homeAddressForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.show();
      let jsonData = {
        "address": this.homeAddressForm.controls.addressLine1.value,
        "address1": this.homeAddressForm.controls.addressLine1.value,
        "postalCode": this.homeAddressForm.controls.addressLine1.value,
        "cityId": this.homeAddressForm.controls.addressLine1.value,
        "countryId": this.homeAddressForm.controls.addressLine1.value,
        "stateId": this.homeAddressForm.controls.addressLine1.value,
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


}
