import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class BuyAndSellService {


  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { }


  postAutoCompleteUsdToBtcAndEth(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/convertusdtocrypptovalue", data, this.header.getHttpHeader());
  }

  postExchangeBtcToEth(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/exchange/request", data, this.header.getHttpHeader());
  }

  postBtcOrEthMinAndMaxValue(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/getminmaxcryptovalue", data, this.header.getHttpHeader());
  }

  postHistoryTabList(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/retrieve/exchange/userid", data, this.header.getHttpHeader());
  }

  postRequestedEthOrBtc(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/fetchrequestsbymode", data, this.header.getHttpHeader());
  }

  // postUserTabList(data: any) {
  //   return this.http.post(this.url.apiUrl + "bluewallet/fetch/exchange/requests", data, this.header.getHttpHeader());
  // }

  postBtcTOEthEcxhange(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/btc_eth/user/exchange", data, this.header.getHttpHeader());
  }

  postEthToBtcEcxhange(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/eth_btc/exchange", data, this.header.getHttpHeader());
  }
}
