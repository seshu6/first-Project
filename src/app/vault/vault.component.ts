import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaultService } from '../vault.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


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
  availabeBalance: number | string;
  usdBtc: number | string;
  usdEstimation: number | string;
  termsAndCondition: boolean = false;
  ethOrBtc: string = "ETH";
  usdForEthOrBtc: number | string;

  addVaultForm: FormGroup;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private fb: FormBuilder, private vaultService: VaultService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    });
    this.onSliderCryptoCurrency("ETH");
  }

  // AUTO COMPLETE BTC ESTIMATION 
  onAutoChangeEthOrBtcEstimation() {
    let jsonData = {};
    if (this.ethOrBtc == "ETH") {
      jsonData = {
        "etherAmount": this.estimatedEth,
        "cryptoType": this.ethOrBtc
      }
    } else {
      jsonData = {
        "btcAmount": this.estimatedEth,
        "cryptoType": this.ethOrBtc
      }
    }

    this.vaultService.postAutoCompleteEthOrBtcEstimation(jsonData).subscribe(success => {
      if (success['status'] == "success") {
        console.log("response", success);
        // this.estimatedEth = success['CalculatingAmountDTO'].etherAmount;
        if (this.ethOrBtc == "ETH") {
          this.estimatedFee = success['CalculatingAmountDTO'].gasfee;
          this.estimatedTotal = success['CalculatingAmountDTO'].totalamount;
          this.usdBtc = success['CalculatingAmountDTO'].usdforEther;
          this.usdEstimation = success['CalculatingAmountDTO'].usdforgasfee;
        } else {
          this.estimatedFee = success['CalculatingAmountDTO'].fee;
          this.estimatedTotal = success['CalculatingAmountDTO'].totalamount;
          this.usdBtc = success['CalculatingAmountDTO'].usdforBtc;
          this.usdEstimation = success['CalculatingAmountDTO'].usdfoestimationfee;
        }


      } else if (success['status'] == "failure") {
        // Swal.fire("Error", success['message'], "error");
      }
    }, error => {

    })

  }


  // SLIDER SELECTED CRYPTOCURRENCY
  onSliderCryptoCurrency(data: string) {
    this.spinner.show();
    this.ethOrBtc = data;
    let jsonData = {
      "userId": "34",
      "cryptoType": this.ethOrBtc
    }
    this.vaultService.postSliderCryptocurrency(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        if (this.ethOrBtc == "ETH") {
          this.availabeBalance = success['CalculatingAmountDTO'].ethercurrentvalue;
          this.usdForEthOrBtc = success['CalculatingAmountDTO'].usdforEther;
        } else {
          this.availabeBalance = success['CalculatingAmountDTO'].btcAmount;
          this.usdForEthOrBtc = success['CalculatingAmountDTO'].usdforBtc;
        }
      } else if (success['status'] == "failure") {
        // Swal.fire("Error", success['message'], "error"); 
      }
    }, error => {
      this.spinner.hide();

    })
  }

  onAddVault() {
    if (!Boolean(this.estimatedEth)) {
      Swal.fire("Info", "Please " + this.ethOrBtc + " details", "info");
    } else if (!Boolean(this.estimatedWallet)) {
      Swal.fire("Info", "Please provide wallet password", "info");
    } else if (!this.termsAndCondition) {
      Swal.fire("Info", "Please accept terms and conditon to proceed", "info");
    } else {
      this.spinner.show();
      let jsonData = {};
      if (this.ethOrBtc == "BTC") {
        jsonData = {
          "email": sessionStorage.getItem("userEmail"),
          "cryptoAmount": this.estimatedEth,
          "typeOfInvestment": this.ethOrBtc,
          "investmentPeriod": this.estimatedTime
        }
      } else {
        jsonData = {
          "email": sessionStorage.getItem("userEmail"),
          "cryptoAmount": this.estimatedEth,
          "typeOfInvestment": this.ethOrBtc,
          "investmentPeriod": this.estimatedTime,
          "ethWalletPassword": this.estimatedWallet
        }
      }

      this.vaultService.postAddVault(jsonData).subscribe(success => {
        this.spinner.hide();
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");

        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }
      }, error => {
        this.spinner.hide();
      })
    }
  }


}
