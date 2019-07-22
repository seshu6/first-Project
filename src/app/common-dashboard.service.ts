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
}
