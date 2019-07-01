import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateWalletService } from '../create-wallet.service';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {
  createWalletForm: FormGroup;
  constructor(private fb: FormBuilder,private spinner:NgxSpinnerService, private createWalletService: CreateWalletService, private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

    this.createWalletForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      conformPassword: ['', Validators.required]
    });


  }


  // CREATE NEW WALLET
  onCreateNewWallet() {
    this.spinner.show();
    this.createWalletService.postCreateWallet(this.createWalletForm.value).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        Swal.fire("Success", success['message'], "success");
        this.createWalletForm.reset();
        this.route.navigate(['dashboard']);
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }

    }, error => {
      this.spinner.hide();
    })
  }

}
