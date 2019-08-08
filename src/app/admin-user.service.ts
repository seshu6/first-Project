import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient, private url: HostUrlService, private commonHeaders: CommonAuthenticationService) { }

  getUserKycList() {
    return this.http.get(this.url.apiUrl + "bluewallet/list/kyc", this.commonHeaders.getHttpHeader());
  }

  postBtcOrEthBalance(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/currentcryptovalue", data, this.header.getHttpHeader());
  }
}
