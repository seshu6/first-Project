import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from '../loader.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginOrForgot: string = "Login";
  loginOrForgotShowOrHide: boolean = true;
  forgotPasswordEmail: string;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private route: Router, private spinner: LoaderService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }




  // OAUTH
  onGetAccessToken(): void {
    if (this.loginForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      const tokenObj = new HttpParams()
        .set('username', this.loginForm.controls.email.value)
        .set('password', this.loginForm.controls.password.value)
        .set('grant_type', "password");
      this.spinner.showOrHide(true);
      this.loginService.postAuthToken(tokenObj.toString()).subscribe(success => {
        sessionStorage.setItem("tokenObj", JSON.stringify(success));
        this.spinner.showOrHide(false);
        this.login();
      }, error => {
        this.spinner.showOrHide(false);
        Swal.fire("Error", error.error.error_description, "error");
      })
    }
    // this.login();
  }

  // LOGIN
  login(): void {
    this.spinner.showOrHide(true);
    this.loginService.postLogin(this.loginForm.value).subscribe(success => {
      // const datajson = JSON.stringify(success);
      // const dataParsed = JSON.parse(datajson);
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        // Swal.fire("Success", success['message'], "success");
        Swal.fire({
          html: '<div class="login-success"><div class="login-success-center"><div class="login-success-content"><div class="login-mesg-cont"><img src="assets/images/tick.png"><h1>Success</h1><p>' + success['message'] + '</p></div></div></div></div>',
          showConfirmButton: true,
          confirmButtonColor: "#00a186"
        });
        // Swal("Hello world!");
        sessionStorage.setItem("userEmail", this.loginForm.controls.email.value);
        sessionStorage.setItem("userId", success['loginInfo'].userId);
        sessionStorage.setItem("roleId", success['loginInfo'].roleId);
        if (success['loginInfo'].roleId == 1) {
          sessionStorage.setItem("roleName", "admin");
          // this.loginService.setUserRole("admin");
          this.route.navigate(['admin-dashboard']);
        } else if (success['loginInfo'].roleId == 0) {
          sessionStorage.setItem("roleName", "user");
          // this.loginService.setUserRole("user");
          this.route.navigate(['dashboard']);
        }
        // this.route.navigate(['dashboard']);
        // this.route.navigate(['verification']);
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      console.log("error from login", error);
    })
  }

  // FORGOT PASSWORD API
  forgotPassword() {
    if (!Boolean(this.forgotPasswordEmail)) {
      Swal.fire("Info", "Please provide e-mail to proceed", "info");
    } else {
      this.spinner.showOrHide(true);
      let jsonData = {
        "email": this.forgotPasswordEmail
      }
      this.loginService.postForgotPassword(jsonData).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.forgotPasswordEmail = "";
          this.loginOrForgotShowOrHide = !this.loginOrForgotShowOrHide;
          this.loginOrForgot = "Login";
          // this.route.navigate(['link/notactivation'])
        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }

      }, error => {
        this.spinner.showOrHide(false);
      })
    }
  }

  showForgotPassword() {
    this.loginOrForgotShowOrHide = !this.loginOrForgotShowOrHide;
    this.loginOrForgot = 'Login';
    this.forgotPasswordEmail = "";
  }


}
