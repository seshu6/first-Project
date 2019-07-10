import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private route: Router, private spinner: NgxSpinnerService) { }

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
      this.spinner.show();
      this.loginService.postAuthToken(tokenObj.toString()).subscribe(success => {
        sessionStorage.setItem("tokenObj", JSON.stringify(success));
        this.spinner.hide();
        this.login();
      }, error => {
        this.spinner.hide();
        Swal.fire("Error", error.error.error_description, "error");
      })
    }
    // this.login();
  }

  // LOGIN
  login(): void {
    this.spinner.show();
    this.loginService.postLogin(this.loginForm.value).subscribe(success => {
      // const datajson = JSON.stringify(success);
      // const dataParsed = JSON.parse(datajson);
      this.spinner.hide();
      if (success['status'] == "success") {
        // Swal.fire("Success", success['message'], "success");
        Swal.fire({
          html: '<div class="login-success"><div class="login-success-center"><div class="login-success-content"><div class="login-mesg-cont"><img src="assets/images/tick.png"><h1>Success</h1><p>'+success['message']+'</p></div></div></div></div>',
          showConfirmButton: true,
          confirmButtonColor: "#00a186"
          });
        // Swal("Hello world!");
        sessionStorage.setItem("userEmail", this.loginForm.controls.email.value);
        sessionStorage.setItem("userId",success['loginInfo'].userId);
        sessionStorage.setItem("roleId",success['loginInfo'].roleId);
        // this.route.navigate(['dashboard']);
        this.route.navigate(['verification']);
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
      console.log("error from login", error);
    })


  }

}
