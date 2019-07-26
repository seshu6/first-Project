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

  postUserActivation(data: any) {
    return this.http.get(this.url.apiUrl + "mobile/verifyaccount?emailId=" + data);
  }

  postForgotPasswordLink(data: any) {
    return this.http.get(this.url.apiUrl + "useractivities/forgot/password/linkVerification?emailId=" + data);
  }

  postConfirmForgotPassword(data: any) {
    return this.http.post(this.url.apiUrl + "useractivities/forgot/password/reset", data, this.header.getHttpHeaderWithoutAccess());
  }

}
