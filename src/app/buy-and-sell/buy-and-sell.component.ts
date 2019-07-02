import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuyAndSellService } from '../buy-and-sell.service';
import { Router } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.css']
})
export class BuyAndSellComponent implements OnInit {

  lhsBtcShowOrHide: boolean = false;
  rhsEtherShowOrHide: boolean = false;
  whetherBtcOrEth: string = "BTC";
  usdToBtcAndEth: number | string = 0;
  calculatedBtcOrEth: number | string = 0;
  exchangeAndHistroyShowOrHide: boolean = true;
  minimumBtcOrEthValue: string | number;
  maximumBtcOrEthValue: string | number;
  historyTabUserListArr: any = [];

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: NgxSpinnerService, private buyAndSellService: BuyAndSellService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.changeBtcToEthAndViceVersa();
  }


  // CHANGE FROM BTC TO ETH AND VICE VERSA
  changeBtcToEthAndViceVersa() {
    let btcOrEth: string = "btc";
    this.lhsBtcShowOrHide = !this.lhsBtcShowOrHide;
    this.rhsEtherShowOrHide = !this.rhsEtherShowOrHide
    if (this.lhsBtcShowOrHide) {
      this.whetherBtcOrEth = "BTC";
      btcOrEth = "btc";
    } else {
      this.whetherBtcOrEth = "ETH";
      btcOrEth = "eth";
    }
    this.spinner.show();
    let jsonData = {
      "cryptoType": btcOrEth
    }
    this.buyAndSellService.postBtcOrEthMinAndMaxValue(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        this.minimumBtcOrEthValue = success['CalculatingAmountDTO'].minimumCryptoValue;
        this.maximumBtcOrEthValue = success['CalculatingAmountDTO'].maximumCryptoValue;
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
      }
    })
    if (this.usdToBtcAndEth != 0) {
      this.onAutoCompleteUsdToBtcAndETh();
    }


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
          // if (this.whetherBtcOrEth == "BTC") {
          //   this.calculatedBtcOrEth = success['CalculatingAmountDTO'].btcAmount;
          // } else {
          //   this.calculatedBtcOrEth = success['CalculatingAmountDTO'].etherAmount;
          // }
          this.calculatedBtcOrEth = success['CalculatingAmountDTO'].cryptoAmount;

        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }
      }, error => {
        this.spinner.hide();
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        }

      })
    }

  }


  // EXCHANGE BTC TO ETH AND ETH TO BTC

  onExchangeBtcToEth() {
    if (!Boolean(this.usdToBtcAndEth)) {
      Swal.fire("Info", "Please enter amount to proceed", "info");
    } else {
      this.spinner.show();
      let jsonData = {};
      if (this.lhsBtcShowOrHide) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "BTC_ETH",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "ETH_BTC",
          "amountToTrade": this.calculatedBtcOrEth
        }
      }
      this.buyAndSellService.postExchangeBtcToEth(jsonData).subscribe(success => {
        this.spinner.hide();
        if (success['status'] == "success") {
          Swal.fire({
            html: '<div class="login-success"><div class="login-success-center"><div class="login-success-content"><div class="login-mesg-cont"><img src="assets/images/tick.png"><h1>Success</h1><p>' + success['message'] + '</p></div></div></div></div>',
            showConfirmButton: true,
            confirmButtonColor: "#00a186"
          });
          this.usdToBtcAndEth = 0;
          this.calculatedBtcOrEth = 0;
        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }
      }, error => {
        this.spinner.hide();
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        }
      })
    }

  }


  exchangeTabSelected() {
    this.exchangeAndHistroyShowOrHide = !this.exchangeAndHistroyShowOrHide;
  }

  historyTabSlected() {
    this.exchangeAndHistroyShowOrHide = !this.exchangeAndHistroyShowOrHide;
    this.spinner.show();
    let jsonData = {
      "userId": sessionStorage.getItem("userId")
    }
    this.buyAndSellService.postHistoryTabList(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        this.historyTabUserListArr = success['ListofExchangeRetrieveData'];
        console.log("history tab list", this.historyTabUserListArr);

      } else if (success['status'] == "failure") {
        Swal.fire("Error", "Session Expired", "error");
      }
    }, error => {
      this.spinner.hide();
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })

  }

}
