import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonDashboardService } from '../common-dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home-address',
  templateUrl: './home-address.component.html',
  styleUrls: ['./home-address.component.css']
})
export class HomeAddressComponent implements OnInit {
  homeAddressForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dashboardServices: CommonDashboardService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.homeAddressForm = this.formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]

    });
  }

  addHomeAddressForm() {
    if (this.homeAddressForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.show();

      this.dashboardServices.postAddHomeAddressDetails(this.homeAddressForm).subscribe(success => {
        this.spinner.hide();
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }

      }, error => {
        this.spinner.hide();
      })
    }
  }


}
