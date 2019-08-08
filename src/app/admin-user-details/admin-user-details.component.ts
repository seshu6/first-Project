import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { AdminUserService } from '../admin-user.service';


@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class AdminUserDetailsComponent implements OnInit {
  userListArr: any[] = [];
  currentKycDocsObj: any = {};
  currentModalObj: any = {};
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private adminService: AdminUserService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.getUserList();

  }


  getUserList() {
    this.spinner.showOrHide(true);
    this.adminService.getUserKycList().subscribe(success => {
      this.spinner.showOrHide(false);
      this.userListArr = success['kycList'];
      console.log("user list", this.userListArr);

    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }

  btcOrEthBalance: any;
  btcOrEthUsdDollar: any;
  btcOrEth: string = "BTC";
  currentEthAmount: string | number;
  currentBtcAmount: string | number;
  currentEthAmountStatus: string | number;
  currentBtcAmountStatus: string | number;
  getBtcOrEthBalance(cryptoCurrency: string) {
    let currency = cryptoCurrency;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": currency
    }
    this.adminService.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.currentEthAmount = success['CalculatingAmountDTO'].currentUsdforEther;
        this.currentBtcAmount = success['CalculatingAmountDTO'].currentUsdforBtc;
        this.currentEthAmountStatus = success['CalculatingAmountDTO'].ethStatus;
        this.currentBtcAmountStatus = success['CalculatingAmountDTO'].btcStatus;
        if (this.btcOrEth == "ETH") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].etherAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdforEther;
        } else {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].btcAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdforBtc;
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



  openKycDocument(obj: any) {
    this.currentModalObj = obj;

  }


}
