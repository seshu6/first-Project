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
  vaultModal: boolean = false;
  walletAddress: string;
  copied: string = "copy all";
  kycPageShowOrHide: boolean = false;
  userListShowOrHide: boolean = true;
  currentKycZoomImage: string;
  searchFilter: any;
  btcOrEthBalance: any;
  btcOrEthUsdDollar: any;
  btcOrEth: string = "BTC";
  currentEthAmount: string | number;
  currentBtcAmount: string | number;
  currentEthAmountStatus: string | number;
  currentBtcAmountStatus: string | number;
  roleName = sessionStorage.getItem("roleName");
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private adminService: AdminUserService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {

    })
    if (this.roleName == "admin") {
      this.getUserList();
    } else {
      this.route.navigate(['login']);
    }


  }

  // ngOnDestroy(){
  //   sessionStorage.setItem("active","admin-user-list");
  // }

  getUserList() {
    this.spinner.showOrHide(true);
    this.adminService.getUserKycList().subscribe(success => {
      this.spinner.showOrHide(false);
      this.userListArr = success['kycList1'];
      this.getBtcOrEthBalance("BTC");
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


  openVaultModal(walletAddress: string) {
    this.copied = "copy all";
    this.walletAddress = walletAddress;
    this.vaultModal = true;
  }

  copyToClipboard(): void {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.walletAddress));
      e.preventDefault();
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
    this.copied = "copied";
  }

  openKycDocument(obj: any) {
    this.spinner.showOrHide(true);
    this.adminService.getKycDocumnets(obj.userId).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.currentModalObj = success['kycDocList'];
        this.userListShowOrHide = false;
        this.kycPageShowOrHide = true;
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

  // getKycDocumentDetails(id: any) {
  //   this.spinner.showOrHide(true);
  //   this.adminService.getKycDocumnets(id).subscribe(success => {
  //     this.spinner.showOrHide(false);
  //     if (success['status'] == "success") {
  //       console.log("kyc photos---------->", success);
  //     } else if (success['status'] == "failure") {
  //       Swal.fire("Error", success['message'], "error");
  //     }
  //   }, error => {
  //     this.spinner.showOrHide(false);
  //     if (error.error.error == "invalid_token") {
  //       Swal.fire("Info", "Session Expired", "info");
  //       this.route.navigate(['login']);
  //     }
  //   })
  // }

  // openKycDocsModal(imgSrc: string) {
  //   this.currentKycZoomImage = imgSrc;
  // }

}
