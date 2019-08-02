import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  customUrl: string
  customUrlBoolean: boolean;
  constructor(private http: HttpClient, private url: HostUrlService, private commonHeaders: CommonAuthenticationService) { }

  postRequestApi(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/requestform", data, this.commonHeaders.getHttpHeader());
  }

  setUrlStatus(status: boolean) {
    this.customUrlBoolean = status;
  }
  getUrlStatus() {
    return this.customUrlBoolean;
  }
  setCustomUrl(url: string) {
    this.customUrl = url;
  }
  getCustomUrl() {
    return this.customUrl;
  }
}
