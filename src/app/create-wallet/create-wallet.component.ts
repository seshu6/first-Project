import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateWalletService } from '../create-wallet.service';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {
  createWalletForm: FormGroup;
  constructor(private fb: FormBuilder, private createWalletService: CreateWalletService, private dynamicScriptLoader: DynamicScriptLoaderService,private route:Router) { }

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
    this.createWalletService.postCreateWallet(this.createWalletForm.value).subscribe(success => {
      this.createWalletForm.reset();
      console.log("Success", success);
      this.route.navigate(['dashboard']);
    }, error => {
      console.log("error", error);
    })
  }

}
