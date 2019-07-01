import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { } 

  postAuthToken(data: any) {
    return this.http.post(this.url.tokenUrl, data, this.header.getAuthHeader());
  }

  postLogin(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/login", data, this.header.getHttpHeader());
  }

}
