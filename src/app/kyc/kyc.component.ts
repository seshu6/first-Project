import { Component, OnInit } from '@angular/core';
import { CommonDashboardService } from '../common-dashboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { LoaderService } from '../loader.service';



@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class KycComponent implements OnInit {
  passportFileModel: any;
  nationalFileModel: any;
  residenceFileModel: any;
  passportDocument: any;
  nationalDocument: any;
  residenceDocument: any;
  btcOrEth: string | number;
  btcOrEthBalance: string | number;
  btcOrEthBalanceUsd: string | number;
  fileUploadedOrNot: boolean = false;
  constructor(private spinner: LoaderService, private dynamicScriptLoader: DynamicScriptLoaderService, private dashBoardServices: CommonDashboardService, private route: Router) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.getBtcOrEthBalance("BTC");


  }

  onUploadedKycDocument(event: any, whichFile: string) {

    if (whichFile === "passport") {
      this.passportDocument = event.target.files[0];
      this.fileUploadedOrNot = true;
    } else if (whichFile === "nationalid") {
      this.nationalDocument = event.target.files[0];
      this.fileUploadedOrNot = true;
    } else if (whichFile === "residence") {
      this.residenceDocument = event.target.files[0];
      this.fileUploadedOrNot = true;
    }
    console.log(event.target.files[0]);
  }


  getBtcOrEthBalance(crypto: string | number) {
    this.btcOrEth = crypto;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": this.btcOrEth
    }
    this.dashBoardServices.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        if (this.btcOrEth == "ETH") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].etherAmount;
          this.btcOrEthBalanceUsd = success['CalculatingAmountDTO'].usdforEther;
        } else {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].btcAmount;
          this.btcOrEthBalanceUsd = success['CalculatingAmountDTO'].usdforBtc;
        }

      } else if (success['status'] == "failure") {

      }

    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })

  }




  submitKycDocument() {
    let formVal = new FormData();
    let jsonData = {
      "userId": sessionStorage.getItem("userId")
    }
    if (!this.fileUploadedOrNot) {
      Swal.fire("Info", "Please choose file to upload", "info");
    } else {
      if (this.passportDocument != undefined && this.nationalDocument != undefined && this.residenceDocument != undefined) {
        formVal.append("kycDoc1", this.passportDocument);
        formVal.append("kycDoc2", this.nationalDocument);
        formVal.append("kycDoc3", this.residenceDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("passport nationalid residence");
      } else if (this.passportDocument != undefined && this.nationalDocument != undefined) {
        formVal.append("kycDoc1", this.passportDocument);
        formVal.append("kycDoc2", this.nationalDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("passport nationalid");
      } else if (this.nationalDocument != undefined && this.residenceDocument != undefined) {
        formVal.append("kycDoc1", this.nationalDocument);
        formVal.append("kycDoc2", this.residenceDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("nationalid residence");
      } else if (this.residenceDocument != undefined && this.passportDocument != undefined) {
        formVal.append("kycDoc1", this.residenceDocument);
        formVal.append("kycDoc2", this.passportDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("residence passport");
      } else if (this.passportDocument != undefined) {
        formVal.append("kycDoc1", this.passportDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("passport");
      } else if (this.nationalDocument != undefined) {
        formVal.append("kycDoc1", this.nationalDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("nationalid");
      } else if (this.residenceDocument != undefined) {
        formVal.append("kycDoc1", this.residenceDocument);
        formVal.append("userInfo", JSON.stringify(jsonData));
        console.log("residence");
      }
      this.dashBoardServices.postUploadKycDocument(formVal).subscribe(success => {
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.route.navigate(['dashboard']);

        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }
      }, error => {
        // this.spinner.hide();
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
        }
      })
    }
  }
}
