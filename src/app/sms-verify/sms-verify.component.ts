import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-sms-verify',
  templateUrl: './sms-verify.component.html',
  styleUrls: ['./sms-verify.component.css']
})
export class SmsVerifyComponent implements OnInit {
  enableOrDisable: string;
  initialStatus: string;
  constructor(private route: Router, private dashboardService: CommonDashboardService, private spinner: LoaderService) { }

  ngOnInit() {
    this.getEnableOrDisable("initial");
  }
  goToHomeAddress() {
    this.route.navigate(['dashboard/homeaddress']);
  }

  getEnableOrDisable(when: string) {
    this.initialStatus = when;
    this.spinner.showOrHide(true);
    let jsonData = {};
    if (this.initialStatus == "initial") {
      jsonData = {
        "userId": sessionStorage.getItem("userId")
      }
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "twoFactorAuthenticationStatus": (this.enableOrDisable == "Enable") ? 1 : 0
      }
    }

    this.dashboardService.postEnableOrDisable(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        console.log(success);
        (success['twoFactorStatus'] == 1) ? this.enableOrDisable = "Enable" : this.enableOrDisable = "Disable";
        if (this.initialStatus != "initial") {
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
}
