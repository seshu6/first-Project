import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private url: HostUrlService, private commonHeaders: CommonAuthenticationService) { }

  postRequestApi(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/requestform", data, this.commonHeaders.getHttpHeader());
  }
}
