import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateWalletService } from '../create-wallet.service';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {
  createWalletForm: FormGroup;
  weakPassword: boolean = false;
  mediumPassword: boolean = false;
  strongPassword: boolean = false;
  passwordMeterShowOrHide: boolean = false;
  confirmPasswordShowOrHide: boolean = false;
  successMailShowOrHide: boolean = false;
  constructor(private fb: FormBuilder, private createWalletService: CreateWalletService, private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

    this.createWalletForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', Validators.required],
      conformPassword: ['', Validators.required]
    });


  }


  // CREATE NEW WALLET
  onCreateNewWallet() {
    if (this.createWalletForm.invalid) {
      Swal.fire("Error", "Please check details", "error");
    } else {
      this.spinner.showOrHide(true);
      this.createWalletService.postCreateWallet(this.createWalletForm.value).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          // Swal.fire("Success", success['message'], "success");
          this.createWalletForm.reset();
          // this.route.navigate(['dashboard']);
          this.successMailShowOrHide = true;
        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
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


  checkPasswordStrength() {
    this.passwordMeterShowOrHide = true;
    this.weakPassword = true;
    if (!Boolean(this.createWalletForm.controls.password.value)) {
      this.passwordMeterShowOrHide = true;
      this.weakPassword = true;
      this.mediumPassword = false;
      this.strongPassword = false;
    } else {
      if (/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,50}$/g.test(this.createWalletForm.get('password').value)) {
        this.passwordMeterShowOrHide = true;
        this.weakPassword = true;
        this.mediumPassword = false;
        this.strongPassword = false;
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)[a-zA-Z0-9]{3,50}$/g.test(this.createWalletForm.get('password').value)) {
        this.passwordMeterShowOrHide = true;
        this.weakPassword = false;
        this.mediumPassword = true;
        this.strongPassword = false;
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,50}$/g.test(this.createWalletForm.get('password').value)) {
        this.passwordMeterShowOrHide = true;
        this.weakPassword = false;
        this.mediumPassword = false;
        this.strongPassword = true;
      }
    }

    console.log(this.weakPassword + " " + this.mediumPassword + " " + this.strongPassword);
  }

  confirmPasswordChecker() {
    if (!(this.createWalletForm.get('password').value == this.createWalletForm.get('conformPassword').value)) {
      this.confirmPasswordShowOrHide = true;
    } else {
      this.confirmPasswordShowOrHide = false;
    }
  }


  goToMailPage() {
    this.route.navigate(['login']);
    window.open("https://gmail.com");

  }
  goToLoginPage() {
    this.route.navigate(['login']);
  }

}
