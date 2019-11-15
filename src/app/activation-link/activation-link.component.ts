import { Component, OnInit } from '@angular/core';
import { TwoStepsVerificationService } from '../two-steps-verification.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { HostUrlService } from '../host-url.service';

@Component({
  selector: 'app-activation-link',
  templateUrl: './activation-link.component.html',
  styleUrls: ['./activation-link.component.css']
})
export class ActivationLinkComponent implements OnInit {
  activationEmailLink: string = "";
  // urlSplitter: string[] = [];
  forgotPasswordShowOrHide: boolean = false;
  userId: string;
  oldPassword: string;
  confirmPassword: string;
  whetherPasswordSame: boolean = false;
  arrayUrl: any[] = this.commonService.getCustomUrl().split("/");
  customUrl: string = "";
  // encodeOrDecodeUrl: string;
  urlIndex: number;
  weakPassword: boolean = false;
  testingPassword: boolean = false;
  mediumPassword: boolean = false;
  strongPassword: boolean = false;
  passwordMeterShowOrHide: boolean = false;
  apiUrl: string;
  constructor(private url: HostUrlService, private commonService: CommonService, private twoStepsVerification: TwoStepsVerificationService, private route: Router, private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.activationEmailLink = params.email;
    })
    this.userActivationLink();
  }

  // initializeApiUrl() {
  //   this.url.getSettingJson().subscribe(url => {
  //     this.apiUrl = url.apiUrl;
  //     this.userActivationLink();
  //   })
  // }


  userActivationLink() {

    for (let i = 0; i < this.arrayUrl.length; i++) {
      if (this.arrayUrl[i] == "link" || this.arrayUrl[i] == "forgot") {
        this.urlIndex = i;
      }
    }

    for (let i = this.urlIndex + 1; i < this.arrayUrl.length; i++) {
      if ((this.arrayUrl.length - 1) == i) {
        this.customUrl += this.arrayUrl[i];
      } else {
        this.customUrl += this.arrayUrl[i] + "/";
      }
    }

    // for (let i = 0; i < this.urlSplitter.length; i++) {
    //   if (this.urlSplitter[i] == "link" || this.urlSplitter[i] == "forgot") {
    //     this.urlIndex = i;
    //   }
    //   if ((this.urlSplitter.length - 1) == i) {
    //     this.customUrl += this.urlSplitter[i];
    //   } else {
    //     this.customUrl += this.urlSplitter[i] + "/";
    //   }
    // }

    // this.encodeOrDecodeUrl = encodeURI(this.customUrl);
    // this.activationEmailLink = decodeURI(this.encodeOrDecodeUrl);
    this.activationEmailLink = this.customUrl;

    if (this.arrayUrl[this.urlIndex] == "link") {
      this.spinner.showOrHide(true);
      this.twoStepsVerification.postUserActivation(this.activationEmailLink).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire({
            title: 'Success',
            text: success['message'],
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3fc3ee',
            confirmButtonText: 'Login'
          }).then(data => {
            // if(data.value){

            // }
            this.route.navigate(['login'])
          })
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

        this.spinner.showOrHide(false);
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        }
      })
    } else if (this.arrayUrl[this.urlIndex] == "forgot") {
      // this.route.navigate([this.route.url]);
      this.checkForgotPasswordLink();
    } else {
      this.route.navigate(['']);

    }


  }


  checkPasswordStrength() {
    this.passwordMeterShowOrHide = true;
    this.weakPassword = true;
    if (!Boolean(this.oldPassword)) {
      this.passwordMeterShowOrHide = true;
      this.weakPassword = true;
      this.mediumPassword = false;
      this.strongPassword = false;
    } else {
      if (/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,50}$/g.test(this.oldPassword)) {
        this.passwordMeterShowOrHide = true;
        this.weakPassword = true;
        this.mediumPassword = false;
        this.strongPassword = false;
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)[a-zA-Z0-9]{3,50}$/g.test(this.oldPassword)) {
        this.passwordMeterShowOrHide = true;
        this.weakPassword = false;
        this.mediumPassword = true;
        this.strongPassword = false;
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,50}$/g.test(this.oldPassword)) {
        this.passwordMeterShowOrHide = true;
        this.weakPassword = false;
        this.mediumPassword = false;
        this.strongPassword = true;
      }
    }
  }

  // CHECK LINK FOR PASSWORD
  checkForgotPasswordLink() {
    this.spinner.showOrHide(true);
    this.twoStepsVerification.postForgotPasswordLink(this.activationEmailLink).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.forgotPasswordShowOrHide = true;
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
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }
  // SUBMIT FORGOT PASSWORD
  submitChangedPassword() {
    if ((!Boolean(this.oldPassword)) || (!Boolean(this.confirmPassword)) || this.whetherPasswordSame) {
      Swal.fire("Info", "Please check your details", "info");
    } else {
      this.spinner.showOrHide(true);
      let jsonData = {
        "email": this.activationEmailLink,
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
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        }
      })
    }
  }


  goToLoginPage() {
    this.route.navigate(['login']);
  }



}
