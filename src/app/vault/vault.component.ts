import { Component, OnInit, HostListener } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VaultService } from '../vault.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import * as M from 'src/assets/materialize/js/materialize';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
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
  ethOrBtc: string = "BTC";
  usdForEthOrBtc: number | string;
  addVaultForm: FormGroup;
  activeCryptoCurrencyDetails: any = [];
  completedCryptoCurrencyDetails: any = [];
  btcIsSelected: boolean = true;
  ethIsSelected: boolean = false;
  allSelected: boolean = false;
  options: any;
  currentlySelectedCryptoType: string;
  newVaultShadowEffect: boolean = false;
  currentEthAmount: string | number;
  currentBtcAmount: string | number;
  currentEthAmountStatus: number;
  currentBtcAmountStatus: |number;
  vaultPageShowOrHide: boolean = true;
  vaultHistoryPageShowOrHide: boolean = false;
  roleName: string = sessionStorage.getItem("roleName");

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private fb: FormBuilder, private route: Router, private vaultService: VaultService, private spinner: LoaderService) { }

  ngOnInit() {
    // let elems = document.querySelector('.carousel');
    // let instances = M.Carousel.init(elems, this.options);
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    });
    this.onSliderCryptoCurrency("BTC");
    this.getActiveVaultInformation("BTC", "initial");
  }

  // ngOnDestroy(){
  //   sessionStorage.setItem("active","vault");
  // }

  // REFRESH PAGE
  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event) {
  //   sessionStorage.setItem("active", "vault");
  // }


  // AUTO COMPLETE BTC AND ETH ESTIMATION 
  onAutoChangeEthOrBtcEstimation() {
    let jsonData = {};
    // if (this.estimatedEth > 0) {

    if (Boolean(this.estimatedEth)) {

      if (this.estimatedEth != "") {
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
          Swal.fire("Error", success['message'], "error");
        }
      }, error => {
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        }
      })
    } else {
      this.estimatedFee = 0;
      this.estimatedTotal = 0;
      this.usdBtc = 0;
      this.usdEstimation = 0;
    }



  }


  // SLIDER SELECTED CRYPTOCURRENCY
  onSliderCryptoCurrency(data: string, index?: number | string) {
    this.spinner.showOrHide(true);
    this.clearInvestmentData();
    if (index != undefined) {
      let elem = document.querySelector('.carousel');
      let carouselInstances = M.Carousel.getInstance(elem);
      carouselInstances.set(index);
    }
    this.ethOrBtc = data;
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": this.ethOrBtc
    }
    this.vaultService.postSliderCryptocurrency(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.currentEthAmount = success['CalculatingAmountDTO'].currentUsdforEther;
        this.currentBtcAmount = success['CalculatingAmountDTO'].currentUsdforBtc;
        this.currentEthAmountStatus = success['CalculatingAmountDTO'].ethStatus;
        this.currentBtcAmountStatus = success['CalculatingAmountDTO'].btcStatus;
        if (this.ethOrBtc == "ETH") {
          // this.availabeBalance = success['CalculatingAmountDTO'].ethercurrentvalue;
          this.availabeBalance = success['CalculatingAmountDTO'].etherAmount;
          this.usdForEthOrBtc = success['CalculatingAmountDTO'].usdforEther;
        } else {
          this.availabeBalance = success['CalculatingAmountDTO'].btcAmount;
          this.usdForEthOrBtc = success['CalculatingAmountDTO'].usdforBtc;
        }
        if (index == undefined) {
          this.getActiveVaultInformation(this.ethOrBtc, "notinitial");
        }

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

  getBtcOrEthBalance(cryptoCurrency: string) {
    let currency = cryptoCurrency;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": currency
    }
    this.vaultService.postSliderCryptocurrency(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.currentEthAmount = success['CalculatingAmountDTO'].currentUsdforEther;
        this.currentBtcAmount = success['CalculatingAmountDTO'].currentUsdforBtc;
        this.currentEthAmountStatus = success['CalculatingAmountDTO'].ethStatus;
        this.currentBtcAmountStatus = success['CalculatingAmountDTO'].btcStatus;
        if (this.ethOrBtc == "ETH") {
          // this.availabeBalance = success['CalculatingAmountDTO'].ethercurrentvalue;
          this.availabeBalance = success['CalculatingAmountDTO'].etherAmount;
          this.usdForEthOrBtc = success['CalculatingAmountDTO'].usdforEther;
        } else {
          this.availabeBalance = success['CalculatingAmountDTO'].btcAmount;
          this.usdForEthOrBtc = success['CalculatingAmountDTO'].usdforBtc;
        }


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


  // GET ACTIVE VAULT INFORMATION

  vaultHistoryArr: any[] = [];
  getActiveVaultInformation(cryptoType: string, when?: string) {
    this.currentlySelectedCryptoType = cryptoType;
    if (cryptoType == "BTC") {
      this.btcIsSelected = true;
      this.ethIsSelected = false;
    } else if (cryptoType == "ETH") {
      this.btcIsSelected = false;
      this.ethIsSelected = true;
    } else if (cryptoType == "all") {
      this.btcIsSelected = true;
      this.ethIsSelected = true;
    }
    if (when != "initial") {
      this.spinner.showOrHide(true);
    }

    let jsonData = {
      "email": sessionStorage.getItem("userEmail"),
      "typeOfInvestment": cryptoType
    }
    this.vaultService.postCommonActiveVaultList(jsonData).subscribe(success => {
      // let stringss = JSON.stringify(success);
      if (when != "initial") {
        this.spinner.showOrHide(false);
      }

      if (success['status'] == "success") {
        this.activeCryptoCurrencyDetails = [];
        this.completedCryptoCurrencyDetails = [];
        this.vaultHistoryArr = [];
        this.vaultHistoryArr = success['listofuserCryptoinvestmentdto'];
        console.log("vault history", this.vaultHistoryArr);
        for (let i = 0; i < success['listofuserCryptoinvestmentdto'].length; i++) {
          if (success['listofuserCryptoinvestmentdto'][i].status == 1) {
            this.activeCryptoCurrencyDetails.push(success['listofuserCryptoinvestmentdto'][i]);
          } else {
            this.completedCryptoCurrencyDetails.push(success['listofuserCryptoinvestmentdto'][i]);
          }
        }
        console.log("active", this.activeCryptoCurrencyDetails);
        console.log("complete", this.completedCryptoCurrencyDetails);
        if (this.currentlySelectedCryptoType != "all" && when != "initial") {
          if (this.currentlySelectedCryptoType == "BTC") {
            this.onSliderCryptoCurrency(this.currentlySelectedCryptoType, 0);
          } else if (this.currentlySelectedCryptoType == "ETH") {
            this.onSliderCryptoCurrency(this.currentlySelectedCryptoType, 1);
          }
        }

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

  onAddVault() {
    if (this.roleName == "admin") {
      Swal.fire("Info", "Access Denied", "info");
    } else if (!Boolean(this.estimatedEth)) {
      Swal.fire("Info", "Please provide " + this.ethOrBtc + " details", "info");
    } else if ((!Boolean(this.estimatedWallet)) && this.ethOrBtc == "ETH") {
      Swal.fire("Info", "Please provide wallet password", "info");
    } else if (!this.termsAndCondition) {
      Swal.fire("Info", "Please accept terms and conditon to proceed", "info");
    } else {
      this.spinner.showOrHide(true);
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
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          // this.clearInvestmentData();
          // if (this.newVaultShadowEffect) {
          //   this.newVaultShadowEffect = false;
          // }
          this.route.navigateByUrl('dashboard', { skipLocationChange: true }).then(() =>
            this.route.navigate(["vault"]));
          Swal.fire("Success", success['message'], "success");

        } else if (success['status'] == "failure") {
          Swal.fire("Error", success['message'], "error");
        }
      }, error => {
        this.spinner.showOrHide(false);
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
          this.route.navigate(['login']);
        } else {
          Swal.fire("Error", error.error.error_description, "error");
        }
      })
    }
  }

  // CRYPTOCURRENCY LIST
  clearInvestmentData() {
    this.estimatedEth = "";
    this.estimatedFee = "";
    this.estimatedTotal = "";
    this.usdBtc = "";
    this.usdEstimation = "";
    this.estimatedWallet = "";
  }


  // VAULT HISTORY
  goToVaultHistory() {

    this.vaultHistoryPageShowOrHide = true;
    this.vaultPageShowOrHide = false;
    // this.spinner.showOrHide(true);
    // let jsonData = {};
    // this.vaultService.postAddVault(jsonData).subscribe(success => {
    //   this.spinner.showOrHide(false);
    //   if (success['status'] == "success") {

    //   } else if (success['status'] == "failure") {
    //     Swal.fire("Error", success['message'], "error");
    //   }
    // }, error => {
    //   this.spinner.showOrHide(false);
    //   if (error.error.error == "invalid_token") {
    //     Swal.fire("Info", "Session Expired", "info");
    //     this.route.navigate(['login']);
    //   } else {
    //     Swal.fire("Error", error.error.error_description, "error");
    //   }
    // })
  }

  backToVault() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    });
    this.vaultHistoryPageShowOrHide = false;
    this.vaultPageShowOrHide = true;

  }


}
