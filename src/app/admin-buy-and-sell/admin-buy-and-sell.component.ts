import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuyAndSellService } from '../buy-and-sell.service';
import { Router } from '@angular/router';
import $ from "jquery";
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-admin-buy-and-sell',
  templateUrl: './admin-buy-and-sell.component.html',
  styleUrls: ['./admin-buy-and-sell.component.css'], animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class AdminBuyAndSellComponent implements OnInit {

  lhsBtcShowOrHide: boolean = false;
  rhsEtherShowOrHide: boolean = false;
  whetherBtcOrEth: string = "BTC";
  usdToBtcAndEth: number | string = 0;
  calculatedBtcOrEth: number | string = 0;
  exchangeAndHistroyShowOrHide: boolean = false;
  minimumBtcOrEthValue: string | number;
  maximumBtcOrEthValue: string | number;
  historyTabUserListArr: any = [];
  currentBtcValue: string;
  currentEthValue: string;
  historyTablistCollapse: boolean = false;
  previousClickedIndex: number | string;
  currentClickedIndex: number | string;
  increOrDecreHistoryIndex: number = 0;
  platformOrUserTab: boolean = true;
  requestedEthOrBtcListArray: any[] = [];

  whenPlatformIsSelected: boolean = true;
  whenPlatformExchangeIsSelected: boolean = false;
  whenPlatformHistoryIsSelected: boolean = false;

  platformTabShowOrHide: boolean = true;
  platformExchangeShowOrHide: boolean = false;
  platformHistoryShowOrHide: boolean = true;

  btcOrEthPrice: string;
  btcOrEthPriceDollar: string;
  networkFee: string;
  minCommercialLimits: string;
  maxCommercialLimits: string;
  send: string;
  receive: string;
  exchangeCryptoType: string;
  // userTabListArr: any[] = [];



  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private buyAndSellService: BuyAndSellService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {

    })
    this.changeBtcToEthAndViceVersa();
    this.getRequestedEthOrBtc();
    this.adminExchangeTabData();
    // this.getUserTabListData();
  }


  // CHANGE FROM BTC TO ETH AND VICE VERSA
  changeBtcToEthAndViceVersa() {
    let btcOrEth: string = "btc";
    this.lhsBtcShowOrHide = !this.lhsBtcShowOrHide;
    this.rhsEtherShowOrHide = !this.rhsEtherShowOrHide
    $("#bitoicnlink img").addClass("bounceInDown");
    if (this.lhsBtcShowOrHide) {
      this.whetherBtcOrEth = "BTC";
      btcOrEth = "btc";
      setTimeout(function () {
        $("#bitoicnlink img").addClass("slideInUp animated");
        $("#bitoicnlink1 img").addClass("slideInUp animated");
      }, 10)
    } else {
      this.whetherBtcOrEth = "ETH";
      btcOrEth = "eth";
      setTimeout(function () {
        this.whetherBtcOrEth = "ETH";
        $("#bitoicnlink img").addClass("slideInDown animated");
        $("#bitoicnlink1 img").addClass("slideInDown animated");
      }, 10)
    }
    // this.spinner.showOrHide(true);
    let jsonData = {
      "cryptoType": btcOrEth
    }
    this.buyAndSellService.postBtcOrEthMinAndMaxValue(jsonData).subscribe(success => {
      // this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.minimumBtcOrEthValue = success['CalculatingAmountDTO'].minimumCryptoValue;
        this.maximumBtcOrEthValue = success['CalculatingAmountDTO'].maximumCryptoValue;
        this.adminExchangeTabData();
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      // this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
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
        this.spinner.showOrHide(false);
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
      this.spinner.showOrHide(true);
      let jsonData = {};
      if (this.lhsBtcShowOrHide && this.platformOrUserTab) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "BTC_ETH_ADMIN",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else if ((!this.lhsBtcShowOrHide) && (this.platformOrUserTab)) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "ETH_BTC_ADMIN",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else if ((this.lhsBtcShowOrHide) && (!this.platformOrUserTab)) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "BTC_ETH_USER",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else if ((!this.lhsBtcShowOrHide) && (!this.platformOrUserTab)) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "ETH_BTC_USER",
          "amountToTrade": this.calculatedBtcOrEth
        }
      }
      // if (this.lhsBtcShowOrHide) {
      //   jsonData = {
      //     "userId": sessionStorage.getItem("userId"),
      //     "exchangeMode": "BTC_ETH",
      //     "amountToTrade": this.calculatedBtcOrEth
      //   }
      // } else {
      //   jsonData = {
      //     "userId": sessionStorage.getItem("userId"),
      //     "exchangeMode": "ETH_BTC",
      //     "amountToTrade": this.calculatedBtcOrEth
      //   }
      // }
      this.buyAndSellService.postExchangeBtcToEth(jsonData).subscribe(success => {
        this.spinner.showOrHide(false);
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
        this.spinner.showOrHide(false);
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        }
      })
    }

  }

  platformSelected() {
    this.whenPlatformIsSelected = true;
    this.whenPlatformExchangeIsSelected = false;
    this.whenPlatformHistoryIsSelected = false;
    this.platformTabShowOrHide = true;
    this.platformExchangeShowOrHide = false;
    this.platformHistoryShowOrHide = true;
    this.getRequestedEthOrBtc();
  }

  exchangeTabSelected() {
    if (this.whenPlatformIsSelected) {
      this.whenPlatformIsSelected = true;
      this.whenPlatformExchangeIsSelected = true;
      this.whenPlatformHistoryIsSelected = false;
      this.platformTabShowOrHide = false;
      this.platformExchangeShowOrHide = true;
      this.platformHistoryShowOrHide = true;
    } else {
      this.whenPlatformIsSelected = false;
      this.whenPlatformExchangeIsSelected = true;
      this.whenPlatformHistoryIsSelected = false;
      this.platformTabShowOrHide = false;
      this.platformExchangeShowOrHide = true;
      this.platformHistoryShowOrHide = true;
    }

  }

  historyTabSlected() {
    if (this.whenPlatformIsSelected) {
      this.whenPlatformIsSelected = true;
      this.whenPlatformExchangeIsSelected = false;
      this.whenPlatformHistoryIsSelected = true;
      this.platformTabShowOrHide = false;
      this.platformExchangeShowOrHide = false;
      this.platformHistoryShowOrHide = false;
    } else {
      this.whenPlatformIsSelected = false;
      this.whenPlatformExchangeIsSelected = false;
      this.whenPlatformHistoryIsSelected = true;
      this.platformTabShowOrHide = false;
      this.platformExchangeShowOrHide = false;
      this.platformHistoryShowOrHide = false;
    }

    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId")
    }
    this.buyAndSellService.postHistoryTabList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.historyTabUserListArr = success['fetchExchageRequestDTO'].exchangeDTOList;
        this.currentBtcValue = success['fetchExchageRequestDTO'].btccurrentvalue;
        this.currentEthValue = success['fetchExchageRequestDTO'].ethercurrentvalue;
        

      } else if (success['status'] == "failure") {
        Swal.fire("Error", "Session Expired", "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })

  }

  userTabSelected() {
    this.whenPlatformIsSelected = false;
    this.whenPlatformExchangeIsSelected = false;
    this.whenPlatformHistoryIsSelected = false;
    this.platformTabShowOrHide = true;
    this.platformExchangeShowOrHide = false;
    this.platformHistoryShowOrHide = true;
    this.getRequestedEthOrBtc();
  }

  // userExchangeTabSelected() {

  // }




  onUnActivePrevious(index: string | number) {
    this.increOrDecreHistoryIndex++;
    this.currentClickedIndex = index;
    if (this.increOrDecreHistoryIndex == 1) {
      this.historyTabUserListArr[this.currentClickedIndex].active = true;
    } else {
      this.historyTabUserListArr[this.previousClickedIndex].active = false;
      this.historyTabUserListArr[this.currentClickedIndex].active = true;
    }
    this.previousClickedIndex = this.currentClickedIndex;
  }


  // USER TAB LIST API AND ADMIN
  getRequestedEthOrBtc() {
    this.spinner.showOrHide(true);
    let jsonData = {};
    // let jsonData = {
    //   "userId": sessionStorage.getItem("userId"),
    //   "exchangeMode": sessionStorage.getItem("roleId")
    // }
    if (this.whenPlatformIsSelected) {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "exchangeMode": "admin"
      }
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "exchangeMode": "user"
      }
    }
    this.buyAndSellService.postRequestedEthOrBtc(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.requestedEthOrBtcListArray = success['fetchExchageRequestDTO'].exchangeDTOList;

      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })

  }


  // EXCHANGE CRYPTOCURRENCY API
  exchangeCryptoCurrency(data: any) {

    if (data.exchangeType == "BTC_ETH_USER" || data.exchangeType == "BTC_ETH_ADMIN") {
      this.postBtcToEthExchange(data.amountToTrade, data.btcWalletAddress);
    } else {
      this.postEthToBtcExchange(data.amountToTrade, data.ethWalletAddress);
    }
  }

  postBtcToEthExchange(btcAmount: string | number, address: string | number) {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "toBtcWalletAddress": address,
      "btcAmount": btcAmount
    }
    this.buyAndSellService.postEthToBtcEcxhangeUser(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }

  postEthToBtcExchange(ethAmount: string | number, address: string | number) {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "etherAmount": ethAmount,
      "toEthWalletAddress": address,
      "exchangeReqId": "0",
      "exchangeStatus": 1
    }
    this.buyAndSellService.postEthToBtcEcxhange(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }






  // platformTabSelected() {
  //   this.platformOrUserTab = !this.platformOrUserTab;
  //   this.postRequestedEthOrBtc();
  // }



  // USER TAB LIST API

  // getUserTabListData() {
  // this.spinner.showOrHide(true);
  //   let jsonData = {
  //     "userId": sessionStorage.getItem("userId")
  //   }
  //   this.buyAndSellService.postUserTabList(jsonData).subscribe(success => {
  // this.spinner.showOrHide(false);
  //     if (success['status'] == "success") {
  
  //       this.userTabListArr = success['fetchExchageRequestDTO'].exchangeDTOList;
  //     } else if (success['status'] == "failure") {
  //       Swal.fire("Error", success['message'], "error");
  //     }
  //   }, error => {
  // this.spinner.showOrHide(false);
  //     if (error.error.error == "invalid_token") {
  //       Swal.fire("Info", "Session Expired", "info");
  //       this.route.navigate(['login']);
  //     }
  //   })
  // }


  adminExchangeTabData() {
    this.spinner.showOrHide(true);
    let jsonData = {};

    if (this.whetherBtcOrEth == "BTC") {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "cryptoType": "btc"
      }
    } else {
      jsonData = {
        "usd": sessionStorage.getItem("userId"),
        "cryptoType": "eth"
      }
    }
    this.buyAndSellService.postAdminExchangeTabDetails(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.exchangeCryptoType = success['cryptoType'];
        this.btcOrEthPrice = (this.exchangeCryptoType == 'btc') ? success['btcAmount'] : success['ethAmount'];
        this.btcOrEthPriceDollar = success['usdforBtc'];
        this.minCommercialLimits = success['mincomercialValue'];
        this.maxCommercialLimits = success['maxcomercialValue'];
        this.send = success['paidAmount'];
        this.receive = success['receivedAmount'];

        
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
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
