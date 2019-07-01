import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuyAndSellService } from '../buy-and-sell.service';

@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.css']
})
export class BuyAndSellComponent implements OnInit {

  lhsBtcShowOrHide: boolean = true;
  rhsEtherShowOrHide: boolean = true;
  whetherBtcOrEth: string = "BTC";
  usdToBtcAndEth: number | string;
  calculatedBtcOrEth: number | string = 0;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private spinner: NgxSpinnerService, private buyAndSellService: BuyAndSellService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

  }


  // CHANGE FROM BTC TO ETH AND VICE VERSA
  changeBtcToEthAndViceVersa() {
    this.lhsBtcShowOrHide = !this.lhsBtcShowOrHide;
    this.rhsEtherShowOrHide = !this.rhsEtherShowOrHide
    if (this.lhsBtcShowOrHide) {
      this.whetherBtcOrEth = "BTC";
    } else {
      this.whetherBtcOrEth = "ETH";
    }
    this.onAutoCompleteUsdToBtcAndETh();

  }

  // AUTO COMPLETE(CONVERSION OF USD TO BTC AND ETH)
  onAutoCompleteUsdToBtcAndETh() {
    if (!Boolean(this.usdToBtcAndEth)) {
      Swal.fire("Info", "Please enter amount to proceed", "info");
    } else {
      let jsonData = {};
      if (this.whetherBtcOrEth == "BTC") {
        jsonData = {
          "usd": this.usdToBtcAndEth,
          "cryptoType": "btc"
        }
      } else {
        jsonData = {
          "usd": this.usdToBtcAndEth,
          "cryptoType": "eth"
        }
      }

      this.buyAndSellService.postAutoCompleteUsdToBtcAndEth(jsonData).subscribe(success => {
        console.log("AutoComplete", success);
        if (success['status'] == "success") {
          if (this.whetherBtcOrEth == "BTC") {
            this.calculatedBtcOrEth = success['CalculatingAmountDTO'].btcAmount;
          } else {
            this.calculatedBtcOrEth = success['CalculatingAmountDTO'].etherAmount;
          }

        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }
      }, error => {
        console.log("error from login", error);
      })
    }

  }


}
