import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaultService } from '../vault.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {
  estimatedTime: number | string = "3";
  estimatedEth: number | string;
  estimatedFee: number | string;
  estimatedTotal: number | string;
  estimatedWallet: number | string;
  availabeAmount: number | string;
  usdBtc: number | string;
  usdEstimation: number | string;
  termsAndCondition: boolean = false;

  addVaultForm: FormGroup;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private fb: FormBuilder, private vaultService: VaultService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })


    // this.addVaultForm = this.fb.group({
    //   time: ['', Validators.required],
    //   eth: ['', Validators.required],
    //   fee: ['', Validators.required],
    //   total: ['', Validators.required],
    //   wallet: ['', Validators.required],
    //   // amount: ['', Validators.required],
    //   btcUsd: ['', Validators.required],
    //   estimationUsd: ['', Validators.required]
    // });
  }

  // AUTO COMPLETE BTC ESTIMATION
  onAutoChangeEthEstimation() {
    let jsonData = {
      "etherAmount": this.estimatedEth
    }
    this.vaultService.postAutoCompleteEthEstimation(jsonData).subscribe(success => {
      if (success['status'] == "success") {
        console.log("response", success);
        this.estimatedEth = success['CalculatingAmountDTO'].etherAmount;
        this.estimatedFee = success['CalculatingAmountDTO'].gasfee;
        this.estimatedTotal = success['CalculatingAmountDTO'].totalamount;
        this.usdBtc = success['CalculatingAmountDTO'].usdforether;
        this.usdEstimation = success['CalculatingAmountDTO'].usdforgasfee;

      } else if (success['status'] == "failure") {
        // Swal.fire("Error", success['message'], "error");
      }
    }, error => {

    })

  }


  // SLIDER SELECTED CRYPTOCURRENCY
  onSliderCryptoCurrency() {
    let jsonData = {
      "userId": "34"
    }
    this.vaultService.postSliderCryptocurrency(jsonData).subscribe(success => {
      if (success['status'] == "success") {
        this.availabeAmount = success['CalculatingAmountDTO'].ethercurrentvalue;

      } else if (success['status'] == "failure") {
        // Swal.fire("Error", success['message'], "error");
      }
    }, error => {

    })
  }

  onAddVault() {
    // let jsonData = {
    //   "email": sessionStorage.getItem("userEmail"),
    //   "cryptoAmount": this.estimatedEth,
    //   "typeOfInvestment": "BTC",
    //   "investmentPeriod": this.estimatedTime
    // }
console.log("terms and condition",this.termsAndCondition);
    let jsonData = {
      "email": "vinaykumar2437@gmail.com",
      "cryptoAmount": 0.01,
      "typeOfInvestment": "BTC",
      "investmentPeriod": 3
    }
    this.vaultService.postSliderCryptocurrency(jsonData).subscribe(success => {
      if (success['status'] == "success") {
        Swal.fire("Success", success['message'], "success");

      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {

    })
  }

}
