import { Component, OnInit } from '@angular/core';
import { TwoStepsVerificationService } from '../two-steps-verification.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userId: string;
  oldPassword: string;
  confirmPassword: string;
  whetherPasswordSame: boolean = false;

  constructor(private twoStepsVerification: TwoStepsVerificationService, private route: Router, private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params.id;
    })
    this.checkForgotPasswordLink();
  }


  checkForgotPasswordLink() {
    this.twoStepsVerification.postForgotPasswordLink(this.userId).subscribe(success => {
      if (success['status'] == "success") {

      } else {
        Swal.fire({
          title: 'Error',
          text: success['message'],
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3fc3ee',
          confirmButtonText: 'Login'
        }).then(data => {
          this.route.navigate(['login'])
        })
      }


    }, error => {
      console.log("success", error);
    })
  }

  goToLoginPage() {
    this.route.navigate(['login']);
  }

  submitChangedPassword() {
    if ((!Boolean(this.oldPassword)) || (!Boolean(this.confirmPassword)) || this.whetherPasswordSame) {
      Swal.fire("Info", "Please check your details", "info");
    } else {
      this.spinner.showOrHide(true);
      let jsonData = {
        "email": this.userId,
        "password": this.oldPassword,
        "conformPassword": this.confirmPassword
      }
      this.twoStepsVerification.postConfirmForgotPassword(jsonData).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.route.navigate(['login']);
        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }

      }, error => {
        this.spinner.showOrHide(false);
      })
    }
  }

}
