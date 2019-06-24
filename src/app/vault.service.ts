import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { }

  postAutoCompleteEthEstimation(data: any) {
    return this.http.post(this.url.apiUrl + "amountestimationforether", data, this.header.getHttpHeader());
  }

  postSliderCryptocurrency(data:any){
    return this.http.post(this.url.dummyUrl, data, this.header.getHttpHeader());
  }

  postAddVault(data:any){
    return this.http.post(this.url.dummyUrl, data, this.header.getHttpHeader());
  }
}
