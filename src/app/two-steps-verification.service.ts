import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TwoStepsVerificationService {

  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { }

  postVerifyOtp(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/login/secure", data, this.header.getHttpHeader());
  }
}
