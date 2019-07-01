import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TwoStepsVerificationService } from '../two-steps-verification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-two-steps-verification',
  templateUrl: './two-steps-verification.component.html',
  styleUrls: ['./two-steps-verification.component.css']
})
export class TwoStepsVerificationComponent implements OnInit {
  otp: string;
  constructor(private route: Router, private spinner: NgxSpinnerService, private verificationService: TwoStepsVerificationService) { }

  ngOnInit() {
  }
  onVerifyOtp(): void {
    if (!Boolean(this.otp)) {
      Swal.fire("Info", "Please provide otp to proceed", "info");
    } else {
      this.spinner.show();
      let jsonData = {
        "email": sessionStorage.getItem("userEmail"),
        "securedKey": this.otp
      }
      this.verificationService.postVerifyOtp(jsonData).subscribe(success => {
        this.spinner.hide();
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.route.navigate(['dashboard']);
        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }
        
      }, error => {
        this.spinner.hide();
      })
    }
  }

}
