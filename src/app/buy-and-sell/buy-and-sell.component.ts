import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { BuyAndSellService } from '../buy-and-sell.service';
import { Router } from '@angular/router';
import $ from "jquery";
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { LoaderService } from '../loader.service';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class BuyAndSellComponent implements OnInit {

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
  currentEthAmount: string | number;
  currentBtcAmount: string | number;
  currentEthAmountStatus: number;
  currentBtcAmountStatus: number;
  sendOrRequest: string = "SEND";
  exchangeBtcOrEth: string = "btc";
  currentObj: any;


  // userTabListArr: any[] = [];



  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private buyAndSellService: BuyAndSellService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.changeBtcToEthAndViceVersa();
    this.getRequestedEthOrBtc();
    this.getBtcOrEthBalance();
    // this.adminExchangeTabData();
    // this.getUserTabListData();
  }


  // CHANGE FROM BTC TO ETH AND VICE VERSA
  changeBtcToEthAndViceVersa(where?: string) {
    if (where != "exchange") {
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
          // this.adminExchangeTabData();
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

    } else {
      // this.lhsBtcShowOrHide = !this.lhsBtcShowOrHide;
      // this.rhsEtherShowOrHide = !this.rhsEtherShowOrHide
      if (this.whetherBtcOrEth == "BTC") {
        this.lhsBtcShowOrHide = !this.lhsBtcShowOrHide;
        this.rhsEtherShowOrHide = !this.rhsEtherShowOrHide;
      } else {
        this.lhsBtcShowOrHide = !this.lhsBtcShowOrHide;
        this.rhsEtherShowOrHide = !this.rhsEtherShowOrHide;
      }
      $("#bitoicnlink img").addClass("bounceInDown");
      if (this.lhsBtcShowOrHide) {
        setTimeout(function () {
          $("#bitoicnlink img").addClass("slideInUp animated");
          $("#bitoicnlink1 img").addClass("slideInUp animated");
        }, 10)
      } else {
        setTimeout(function () {
          this.whetherBtcOrEth = "ETH";
          $("#bitoicnlink img").addClass("slideInDown animated");
          $("#bitoicnlink1 img").addClass("slideInDown animated");
        }, 10)
      }
      // this.spinner.showOrHide(true);
      let jsonData = {
        "cryptoType": this.whetherBtcOrEth
      }
      this.buyAndSellService.postBtcOrEthMinAndMaxValue(jsonData).subscribe(success => {
        // this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          this.minimumBtcOrEthValue = success['CalculatingAmountDTO'].minimumCryptoValue;
          this.maximumBtcOrEthValue = success['CalculatingAmountDTO'].maximumCryptoValue;
          // this.adminExchangeTabData();
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
      if (this.lhsBtcShowOrHide && this.whenPlatformIsSelected) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "BTC_ETH_ADMIN",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else if ((!this.lhsBtcShowOrHide) && (this.whenPlatformIsSelected)) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "ETH_BTC_ADMIN",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else if ((this.lhsBtcShowOrHide) && (!this.whenPlatformIsSelected)) {
        jsonData = {
          "userId": sessionStorage.getItem("userId"),
          "exchangeMode": "BTC_ETH_USER",
          "amountToTrade": this.calculatedBtcOrEth
        }
      } else if ((!this.lhsBtcShowOrHide) && (!this.whenPlatformIsSelected)) {
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
    this.sendOrRequest = "SEND";
    this.usdToBtcAndEth = 0;
    this.calculatedBtcOrEth = 0;
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
    this.usdToBtcAndEth = 0;
    this.calculatedBtcOrEth = 0;
    this.sendOrRequest = "REQUEST";
    this.adminExchangeTabData();
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
        console.log("history tab list", this.historyTabUserListArr);

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
    this.sendOrRequest = "SEND";
    this.getRequestedEthOrBtc();
  }

  userExchangeTabSelected() {

  }




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
    this.currentObj = data;

    if (this.sendOrRequest == "SEND") {
      if (data.exchangeType == "BTC_ETH_USER" || data.exchangeType == "BTC_ETH_ADMIN") {

        this.whetherBtcOrEth = "ETH";
        this.usdToBtcAndEth = data.cryptoinusd;
        this.exchangeBtcOrEth = "eth";
        this.onAutoCompleteUsdToBtcAndETh();
        // this.changeBtcToEthAndViceVersa("exchange");
        // this.postBtcToEthUser(data);

      } else if (data.exchangeType == "ETH_BTC_USER" || data.exchangeType == "ETH_BTC_ADMIN") {

        this.whetherBtcOrEth = "BTC";
        this.usdToBtcAndEth = data.cryptoinusd;
        this.exchangeBtcOrEth = "btc";
        this.onAutoCompleteUsdToBtcAndETh();
        // this.changeBtcToEthAndViceVersa("exchange");
        // this.postEthToBtchUser(data);
      }
    } else {
      Swal.fire("Info", "Not allowed", "info");
    }

  }



  onSubmitExchangeDetails() {
    if (this.currentObj.exchangeType == "BTC_ETH_USER") {
      this.postBtcToEthUser();
    } else if (this.currentObj.exchangeType == "ETH_BTC_USER")
      this.postEthToBtchUser();
  }



  checkSendOrRequest() {
    if (this.sendOrRequest == "SEND") {
      if (this.currentObj.exchangeType == "ETH_BTC_ADMIN") {
        this.postBtcToEthAdmin();
      } else if (this.currentObj.exchangeType == "BTC_ETH_ADMIN") {
        this.postEthToBtchAdmin();
      }else if (this.currentObj.exchangeType == "BTC_ETH_USER") {
        this.postEthToBtchUser();
      }else if (this.currentObj.exchangeType == "ETH_BTC_USER") {
        this.postBtcToEthUser();
      }
    } else if (this.sendOrRequest == "REQUEST") {
      this.onExchangeBtcToEth();
    }
  }

  // BTC TO ETH USER
  postBtcToEthUser() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "toBtcWalletAddress": this.currentObj.ethWalletAddress,//ethWalletAddress
      "btcAmount": this.calculatedBtcOrEth,
      "exchangeReqId": this.currentObj.id,//id
      "exchangeStatus": 1
    }
    this.buyAndSellService.postBtcToEthEcxhangeUser(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.getRequestedEthOrBtc();
        Swal.fire("Success", success['message'], "success");
        console.log("***************************BTC TO ETH", success);
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



  // ETH TO BTC USER
  // GIVING ETH AND GETTING BTC
  postEthToBtchUser() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "etherAmount": this.calculatedBtcOrEth,
      "toEthWalletAddress": this.currentObj.ethWalletAddress,
      "exchangeReqId": this.currentObj.id,
      "exchangeStatus": 1
    }

    this.buyAndSellService.postEthToBtcEcxhangeUser(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.getRequestedEthOrBtc();
        Swal.fire("Success", success['message'], "success");
        console.log("***************************BTC TO ETH", success);
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



  // BTC TO ETH ADMIN
  // "ETH_BTC_ADMIN"(refer exchangeType in currentobj)
  // GIVING BTC AND GETTING ETH
  postBtcToEthAdmin() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      // "toBtcWalletAddress": this.currentObj.ethWalletAddress,//ethWalletAddress
      "btcAmount": this.calculatedBtcOrEth,
      "exchangeReqId": this.currentObj.id,//id
      "exchangeStatus": 1
    }
    this.buyAndSellService.postBtcToEthEcxhangeAdmin(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.getRequestedEthOrBtc();
        Swal.fire("Success", success['message'], "success");
        console.log("***************************BTC TO ETH", success);
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



  // ETH TO BTC ADMIN
  // "BTC_ETH_ADMIN"(refer exchangeType in currentobj)
  // GIVING ETH AND GETTING BTC
  postEthToBtchAdmin() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "etherAmount": this.calculatedBtcOrEth,
      "exchangeReqId": this.currentObj.id,
      "exchangeStatus": 1
    }
    this.buyAndSellService.postEthToBtcEcxhangeAdmin(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.getRequestedEthOrBtc();
        Swal.fire("Success", success['message'], "success");
        console.log("***************************BTC TO ETH", success);
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
        console.log("***************************ETH TO BTC", success);
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
  //       console.log("***************************user tab details", success);
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
        "userId": sessionStorage.getItem("userId"),
        "cryptoType": "eth"
      }
    }
    this.buyAndSellService.postAdminExchangeTabDetails(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.exchangeCryptoType = success['CalculatingAmountDTO']['cryptoType'];
        this.btcOrEthPrice = (this.exchangeCryptoType == 'btc') ? success['CalculatingAmountDTO']['btcAmount'] : success['CalculatingAmountDTO']['etherAmount'];
        this.btcOrEthPriceDollar = (this.exchangeCryptoType == 'btc') ? success['CalculatingAmountDTO']['usdforBtc'] : success['CalculatingAmountDTO']['usdforEther'];
        // this.btcOrEthPriceDollar = success['CalculatingAmountDTO']['usdforBtc'];
        this.minCommercialLimits = success['CalculatingAmountDTO']['mincomercialValue'];
        this.maxCommercialLimits = success['CalculatingAmountDTO']['maxcomercialValue'];
        this.send = success['CalculatingAmountDTO']['paidAmount'];
        this.receive = success['CalculatingAmountDTO']['receivedAmount'];

        console.log("admin exchange tab details", success);
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




  // CURRENT BTC AND ETH BALANCE
  getBtcOrEthBalance() {
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": "BTC"
    }
    this.buyAndSellService.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.currentEthAmount = success['CalculatingAmountDTO'].currentUsdforEther;
        this.currentBtcAmount = success['CalculatingAmountDTO'].currentUsdforBtc;
        this.currentEthAmountStatus = success['CalculatingAmountDTO'].ethStatus;
        this.currentBtcAmountStatus = success['CalculatingAmountDTO'].btcStatus;
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
