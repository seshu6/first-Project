import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDashboardService {
  _communicationSubject = new Subject<any>();
  communicationObservable$ = this._communicationSubject.asObservable();

  _sliderSubject = new Subject<any>();
  sliderObservable$ = this._sliderSubject.asObservable();

  _sliderSubjectActivity = new Subject<any>();
  sliderObservableActivity$ = this._sliderSubjectActivity.asObservable();




  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { }

  postUploadKycDocument(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/upload/kyc", data, this.header.getUploadHttpHeader());
  }

  postQrCodeDetails(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/login/secure", data, this.header.getHttpHeader());
  }

  postAddHomeAddressDetails(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/mobileuserregupdate", data, this.header.getHttpHeader());
  }

  fromParentDashboardToDashboard() {
    this._communicationSubject.next();
  }
  sliderFromParentDashboardToDashboard(crypto: string) {
    this._sliderSubject.next(crypto);
  }

  sliderFromDashboardToParent(crypto: string, balance: string | number, usd: string | number) {
    this._sliderSubjectActivity.next({ "crypto": crypto, "balance": balance, "usd": usd });
  }


  getCountryList() {
    return this.http.get(this.url.apiUrl + "bluewallet/countryData", this.header.getHttpHeader());
  }

  postStateList(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/statedata", data, this.header.getHttpHeader());
  }

  postCityList(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/citydata", data, this.header.getHttpHeader());
  }

  postActivityList(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/getactivitydata", data, this.header.getHttpHeader());
  }

  postDashboardChartDetails(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/getgraphdata", data, this.header.getHttpHeader());
  }

  postEnableOrDisable(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/twofactor/authentication", data, this.header.getHttpHeader());
  }
  postBtcOrEthBalance(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/currentcryptovalue", data, this.header.getHttpHeader());
  }
  postQrCodeGenerator(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/getqrcode", data, this.header.getHttpHeader());
  }


  postAutoCompleteUsdToBtcAndEth(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/convertusdtocrypptovalue", data, this.header.getHttpHeader());
  }

  postRequestCryptoCurrency(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/request", data, this.header.getHttpHeader());
  }

  postSendBtcCryptoCurrency(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/btc/transfer", data, this.header.getHttpHeader());
  }

  postSendEthCryptoCurrency(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/eth/transfer", data, this.header.getHttpHeader());
  }

  postKycUpload(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/upload/kyc", data, this.header.getUploadHttpHeader());
  }

  postProfileDetails(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/retrievedata", data, this.header.getHttpHeader());
  }

  postUpdateProfileDetails(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/updateprofiledata", data, this.header.getHttpHeader());
  }

  postUploadProImages(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/updateprofileimage", data, this.header.getUploadHttpHeader());
  }


  // GETTER AND SETTERS

}
