import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { }

  postAutoCompleteEthOrBtcEstimation(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/vaultcalculation", data, this.header.getHttpHeader());
  }

  postSliderCryptocurrency(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/currentcryptovalue", data, this.header.getHttpHeader());
  }

  postAddVault(data: any) {
    return this.http.post(this.url.apiUrl + "useractivities/ethOrbtc/investment", data, this.header.getHttpHeader());
  }

  // postActiveVaultList(data: any) {
  //   return this.http.post(this.url.apiUrl + "bluewallet/fetch/user/cryptoinvestmnet", data, this.header.getHttpHeader());
  // }

postCommonActiveVaultList(data:any){
  return this.http.post(this.url.apiUrl + "bluewallet/fetch/investmentinfoforcrypto", data, this.header.getHttpHeader());
}



}
