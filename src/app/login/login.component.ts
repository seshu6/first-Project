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
    const tokenObj = new HttpParams()
      .set('username', "admin@gmail.com")
      .set('password', "password")
      .set('grant_type', "password");
    this.spinner.show();
    this.loginService.postAuthToken(tokenObj.toString()).subscribe(success => {
      sessionStorage.setItem("tokenObj", JSON.stringify(success));
      this.spinner.hide();
      this.login();
    }, error => {
      this.spinner.hide();
      alert("error");
    })
    // this.login();
  }

  // LOGIN
  login(): void {
    this.spinner.show();
    this.loginService.postLogin(this.loginForm.value).subscribe(success => {
      const datajson = JSON.stringify(success);
      const dataParsed = JSON.parse(datajson);
      this.spinner.hide();
      if (success['status'] == "success") {
        Swal.fire("Success", success['message'], "success");
        sessionStorage.setItem("userEmail", this.loginForm.controls.email.value);
        this.route.navigate(['dashboard']);
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
      console.log("error from login", error);
    })


  }

}
