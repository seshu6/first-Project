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
  btcOrEth: string | number;
  btcOrEthBalance: string | number;
  btcOrEthBalanceUsd: string | number;


  passportSelfie: any;
  passportFrontDocs: any;
  passportBackDocs: any;
  passportSelfieWitDocs: any;

  idCardSelfie: any;
  idCardFrontDocs: any;
  idCardBackDocs: any;
  idCardSelfieWitDocs: any;

  residentSelfie: any;
  residentFrontDocs: any;
  residentBackDocs: any;
  residentSelfieWitDocs: any;

  licenseSelfie: any;
  licenseFrontDocs: any;
  licenseBackDocs: any;
  licenseSelfieWitDocs: any;

  passportSelfieName: string;
  passportFrontDocNames: string;
  passportBackDocsName: string;
  passportSelfieWitDocsName: string;

  idCardSelfieName: string;
  idCardFrontDocsName: string;
  idCardBackDocsName: string;
  idCardSelfieWitDocsName: string;

  residentSelfieName: string;
  residentFrontDocsName: string;
  residentBackDocsName: string;
  residentSelfieWitDocsName: string;

  licenseSelfieName: string;
  licenseFrontDocsName: string;
  licenseBackDocsName: string;
  licenseSelfieWitDocsName: string;

  isPassportValid: number;
  isIdCardValid: number;
  isResidentValid: number;
  isLicenseValid: number;

  passportArr: string[] = [];
  idCardArr: string[] = [];
  residentArr: string[] = [];
  licenseArr: string[] = [];

  kycDocumentValidCount: number = 0;
  passCount: number = 0;
  idCardCount: number = 0;
  residentCount: number = 0;
  licenseCount: number = 0;
  kycErrorMessage: string;
  kycErrorMessageShowOrHide: boolean = false;

  // passportFileModel: any;
  // nationalFileModel: any;
  // residenceFileModel: any;
  // passportDocument: any;
  // nationalDocument: any;
  // residenceDocument: any;

  fileUploadedOrNot: boolean = false;
  constructor(private spinner: LoaderService, private dynamicScriptLoader: DynamicScriptLoaderService, private dashBoardServices: CommonDashboardService, private route: Router) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.getBtcOrEthBalance("BTC");


  }

  onUploadedKycDocument(event: any) {
    console.log(event);
    // if (whichFile === "passport") {
    //   this.passportDocument = event.target.files[0];
    //   this.fileUploadedOrNot = true;
    // } else if (whichFile === "nationalid") {
    //   this.nationalDocument = event.target.files[0];
    //   this.fileUploadedOrNot = true;
    // } else if (whichFile === "residence") {
    //   this.residenceDocument = event.target.files[0];
    //   this.fileUploadedOrNot = true;
    // }
    // console.log(event.target.files[0]);
  }


  setFileDetails(fileName: string, docs: string, event: any) {
    switch (fileName) {
      case "passport":
        switch (docs) {
          case "passportSelfie": this.passportSelfie = event.target.files[0]; this.passportSelfieName = event.target.files[0].name;
            break;
          case "passportFrontDocs": this.passportFrontDocs = event.target.files[0]; this.passportFrontDocNames = event.target.files[0].name;
            break;
          case "passportBackDocs": this.passportBackDocs = event.target.files[0]; this.passportBackDocsName = event.target.files[0].name;
            break;
          case "passportSelfieWitDocs": this.passportSelfieWitDocs = event.target.files[0]; this.passportSelfieWitDocsName = event.target.files[0].name;
            break;
        }
      case "idcard":
        switch (docs) {
          case "idCardSelfie": this.idCardSelfie = event.target.files[0]; this.idCardSelfieName = event.target.files[0].name;
            break;
          case "idCardFrontDocs": this.idCardFrontDocs = event.target.files[0]; this.idCardFrontDocsName = event.target.files[0].name;
            break;
          case "idCardBackDocs": this.idCardBackDocs = event.target.files[0]; this.idCardBackDocsName = event.target.files[0].name;
            break;
          case "idCardSelfieWitDocs": this.idCardSelfieWitDocs = event.target.files[0]; this.idCardSelfieWitDocsName = event.target.files[0].name;
            break;
        }
      case "resident":
        switch (docs) {
          case "residentSelfie": this.residentSelfie = event.target.files[0]; this.residentSelfieName = event.target.files[0].name;
            break;
          case "residentFrontDocs": this.residentFrontDocs = event.target.files[0]; this.residentFrontDocsName = event.target.files[0].name;
            break;
          case "residentBackDocs": this.residentBackDocs = event.target.files[0]; this.residentBackDocsName = event.target.files[0].name;
            break;
          case "residentSelfieWitDocs": this.residentSelfieWitDocs = event.target.files[0]; this.residentSelfieWitDocsName = event.target.files[0].name;
            break;
        }
      case "license":
        switch (docs) {
          case "licenseSelfie": this.licenseSelfie = event.target.files[0]; this.licenseSelfieName = event.target.files[0].name;
            break;
          case "licenseFrontDocs": this.licenseFrontDocs = event.target.files[0]; this.licenseFrontDocsName = event.target.files[0].name;
            break;
          case "licenseBackDocs": this.licenseBackDocs = event.target.files[0]; this.licenseBackDocsName = event.target.files[0].name;
            break;
          case "licenseSelfieWitDocs": this.licenseSelfieWitDocs = event.target.files[0]; this.licenseSelfieWitDocsName = event.target.files[0].name;
            break;
        }
    }

    this.passportArr[0] = this.passportSelfieName;
    this.passportArr[1] = this.passportFrontDocNames;
    this.passportArr[2] = this.passportBackDocsName;
    this.passportArr[3] = this.passportSelfieWitDocsName;


    this.idCardArr[0] = this.idCardSelfieName;
    this.idCardArr[1] = this.idCardFrontDocsName;
    this.idCardArr[2] = this.idCardBackDocsName;
    this.idCardArr[3] = this.idCardSelfieWitDocsName;

    this.residentArr[0] = this.residentSelfieName;
    this.residentArr[1] = this.residentFrontDocsName;
    this.residentArr[2] = this.residentBackDocsName;
    this.residentArr[3] = this.residentSelfieWitDocsName;

    this.licenseArr[0] = this.licenseSelfieName;
    this.licenseArr[1] = this.licenseFrontDocsName;
    this.licenseArr[2] = this.licenseBackDocsName;
    this.licenseArr[3] = this.licenseSelfieWitDocsName;

    // if (this.passportSelfie == undefined && this.passportFrontDocs == undefined && this.passportBackDocs == undefined && this.passportSelfieWitDocs == undefined && this.idCardSelfie == undefined && this.idCardFrontDocs == undefined && this.idCardBackDocs == undefined && this.idCardSelfieWitDocs == undefined && this.residentSelfie == undefined && this.residentFrontDocs == undefined && this.residentBackDocs == undefined && this.residentSelfieWitDocs == undefined && this.licenseSelfie == undefined && this.licenseFrontDocs == undefined && this.licenseBackDocs == undefined && this.licenseSelfieWitDocs == undefined) {
    //   this.kycDocumentValidCount = 0;
    // } else {
    //   this.kycDocumentValidCount = 1;
    // }
    // if (Boolean(this.passportSelfie) && Boolean(this.passportFrontDocs) && Boolean(this.passportBackDocs) && Boolean(this.passportSelfieWitDocs)) {
    //   this.isPassportValid = 1;
    // } else if (this.passportSelfie == undefined && this.passportFrontDocs == undefined && this.passportBackDocs == undefined || this.passportSelfieWitDocs == undefined) {
    //   this.isPassportValid = 2;
    // } else {
    //   this.isPassportValid = 0;
    // }


    // if (Boolean(this.idCardSelfie) && Boolean(this.idCardFrontDocs) && Boolean(this.idCardBackDocs) && Boolean(this.idCardSelfieWitDocs)) {
    //   this.isIdCardValid = 1;
    // } else if (this.idCardSelfie == undefined && this.idCardFrontDocs == undefined && this.idCardBackDocs == undefined && this.idCardSelfieWitDocs == undefined) {
    //   this.isIdCardValid = 2;
    // } else {
    //   this.isIdCardValid = 0;
    // }
    // if ((!Boolean(this.residentSelfie)) && (!Boolean(this.residentFrontDocs)) && (!Boolean(this.residentBackDocs)) && (!Boolean(this.residentSelfieWitDocs))) {
    //   this.isResidentValid = 0;
    // } else {
    //   this.isResidentValid = 1;
    // }
    // if ((!Boolean(this.licenseSelfie)) && (!Boolean(this.licenseFrontDocs)) && (!Boolean(this.licenseBackDocs)) && (!Boolean(this.licenseSelfieWitDocs))) {
    //   this.isLicenseValid = 0;
    // } else {
    //   this.isLicenseValid = 1;
    // }


    // else if (this.idCardSelfie == undefined && this.idCardFrontDocs == undefined || this.idCardBackDocs == undefined || this.idCardSelfieWitDocs == undefined) {
    //   this.isIdCardValid = 1;
    // } else if (this.residentSelfie == undefined && this.residentFrontDocs == undefined || this.residentBackDocs == undefined || this.residentSelfieWitDocs == undefined) {
    //   this.isResidentValid = 1;
    // } else if (this.licenseSelfie == undefined && this.licenseFrontDocs == undefined || this.licenseBackDocs == undefined || this.licenseSelfieWitDocs == undefined) {
    //   this.isLicenseValid = 1;
    // }


  }

  
  submitKycDocument() {
    this.passCount = 0;
    this.idCardCount = 0;
    this.residentCount = 0;
    this.licenseCount = 0;
    for (let i = 0; i < this.passportArr.length; i++) {
      if (this.passportArr[i] == undefined) {
        this.passCount++;
      }
    }
    for (let i = 0; i < this.idCardArr.length; i++) {
      if (this.idCardArr[i] == undefined) {
        this.idCardCount++;
      }
    }
    for (let i = 0; i < this.residentArr.length; i++) {
      if (this.residentArr[i] == undefined) {
        this.residentCount++;
      }
    }
    for (let i = 0; i < this.licenseArr.length; i++) {
      if (this.licenseArr[i] == undefined) {
        this.licenseCount++;
      }
    }
    if (this.passCount == 0 && this.idCardCount == 0 && this.residentCount == 0 && this.licenseCount == 0) {
      this.kycErrorMessageShowOrHide = true;
      this.kycErrorMessage = "Atleast one is mandaoty";
      Swal.fire("Info", "Atleast one is mandaoty", "info");
    } 
    
    else if (this.passCount > 0 && this.passCount < 4) {
      this.kycErrorMessageShowOrHide = true;
      this.kycErrorMessage = "Must upload all the document in passport";
    }
    
    else if (this.idCardCount > 0 && this.idCardCount < 4) {
      this.kycErrorMessageShowOrHide = true;
      this.kycErrorMessage = "Must upload all the document in idcard";
    }
    
    else if (this.residentCount > 0 && this.residentCount < 4) {
      this.kycErrorMessageShowOrHide = true;
      this.kycErrorMessage = "Must upload all the document in resident";
    } 
    
    else if (this.licenseCount > 0 && this.licenseCount < 4) {
      this.kycErrorMessageShowOrHide = true;
      this.kycErrorMessage = "Must upload all the document in license";
    }
    
    else {
      this.kycErrorMessageShowOrHide = false;
      this.kycErrorMessage = "";
      let formDetails = new FormData();
      formDetails.set("userId", sessionStorage.getItem("userId"));
      (this.passportSelfie != undefined) ? formDetails.set("passportSelfie", this.passportSelfie) : formDetails.set("passportSelfie", null);
      (this.passportFrontDocs != undefined) ? formDetails.set("passportDocumentFront", this.passportFrontDocs) : formDetails.set("passportDocumentFront", null);
      (this.passportBackDocs != undefined) ? formDetails.set("passportDocumentBack", this.passportBackDocs) : formDetails.set("passportDocumentBack", null);
      (this.passportSelfieWitDocs != undefined) ? formDetails.set("passportSelfieWithDocument", this.passportSelfieWitDocs) : formDetails.set("passportSelfieWithDocument", null);

      (this.idCardSelfie != undefined) ? formDetails.set("idCardSelfie", this.idCardSelfie) : formDetails.set("idCardSelfie", null);
      (this.idCardFrontDocs != undefined) ? formDetails.set("idCardDocumentFront", this.idCardFrontDocs) : formDetails.set("idCardDocumentFront", null);
      (this.idCardBackDocs != undefined) ? formDetails.set("idCardDocumentBack", this.idCardBackDocs) : formDetails.set("idCardDocumentBack", null);
      (this.idCardSelfieWitDocs != undefined) ? formDetails.set("idCardSelfieWithDocument", this.idCardSelfieWitDocs) : formDetails.set("idCardSelfieWithDocument", null);

      (this.residentSelfie != undefined) ? formDetails.set("residentPermitSelfie", this.residentSelfie) : formDetails.set("residentPermitSelfie", null);
      (this.residentFrontDocs != undefined) ? formDetails.set("residentPermitDocumentFront", this.residentFrontDocs) : formDetails.set("residentPermitDocumentFront", null);
      (this.residentBackDocs != undefined) ? formDetails.set("residentPermitDocumentBack", this.residentBackDocs) : formDetails.set("residentPermitDocumentBack", null);
      (this.residentSelfieWitDocs != undefined) ? formDetails.set("residentPermitSelfieWithDocument", this.residentSelfieWitDocs) : formDetails.set("residentPermitSelfieWithDocument", null);

      (this.licenseSelfie != undefined) ? formDetails.set("drivingLicenceSelfie", this.licenseSelfie) : formDetails.set("drivingLicenceSelfie", null);
      (this.licenseFrontDocs != undefined) ? formDetails.set("drivingLicenceDocumentFront", this.licenseFrontDocs) : formDetails.set("drivingLicenceDocumentFront", null);
      (this.licenseBackDocs != undefined) ? formDetails.set("drivingLicenceDocumentBack", this.licenseBackDocs) : formDetails.set("drivingLicenceDocumentBack", null);
      (this.licenseSelfieWitDocs != undefined) ? formDetails.set("drivingLicenceSelfieWithDocument", this.licenseSelfieWitDocs) : formDetails.set("drivingLicenceSelfieWithDocument", null);


      this.dashBoardServices.postKycUpload(formDetails).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {

          Swal.fire("Success", success['message'], "success");
          this.route.navigate(['dashboard']);

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




  // submitKycDocument() {
  //   let formVal = new FormData();
  //   let jsonData = {
  //     "userId": sessionStorage.getItem("userId")
  //   }
  //   if (!this.fileUploadedOrNot) {
  //     Swal.fire("Info", "Please choose file to upload", "info");
  //   } else {
  //     if (this.passportDocument != undefined && this.nationalDocument != undefined && this.residenceDocument != undefined) {
  //       formVal.append("kycDoc1", this.passportDocument);
  //       formVal.append("kycDoc2", this.nationalDocument);
  //       formVal.append("kycDoc3", this.residenceDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("passport nationalid residence");
  //     } else if (this.passportDocument != undefined && this.nationalDocument != undefined) {
  //       formVal.append("kycDoc1", this.passportDocument);
  //       formVal.append("kycDoc2", this.nationalDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("passport nationalid");
  //     } else if (this.nationalDocument != undefined && this.residenceDocument != undefined) {
  //       formVal.append("kycDoc1", this.nationalDocument);
  //       formVal.append("kycDoc2", this.residenceDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("nationalid residence");
  //     } else if (this.residenceDocument != undefined && this.passportDocument != undefined) {
  //       formVal.append("kycDoc1", this.residenceDocument);
  //       formVal.append("kycDoc2", this.passportDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("residence passport");
  //     } else if (this.passportDocument != undefined) {
  //       formVal.append("kycDoc1", this.passportDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("passport");
  //     } else if (this.nationalDocument != undefined) {
  //       formVal.append("kycDoc1", this.nationalDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("nationalid");
  //     } else if (this.residenceDocument != undefined) {
  //       formVal.append("kycDoc1", this.residenceDocument);
  //       formVal.append("userInfo", JSON.stringify(jsonData));
  //       console.log("residence");
  //     }
  //     this.dashBoardServices.postUploadKycDocument(formVal).subscribe(success => {
  //       if (success['status'] == "success") {
  //         Swal.fire("Success", success['message'], "success");
  //         this.route.navigate(['dashboard']);

  //       } else if (success['status'] == "failure") {
  //         Swal.fire("Failure", success['message'], "error");
  //       }
  //     }, error => {
  //       // this.spinner.hide();
  //       if (error.error.error == "invalid_token") {
  //         Swal.fire("Info", "Session Expired", "info");
  //       }
  //     })
  //   }
  // }





}
