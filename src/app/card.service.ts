import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostUrlService } from './host-url.service';
import { CommonAuthenticationService } from './common-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient, private url: HostUrlService, private header: CommonAuthenticationService) { }

  postChartDetails(data: any) {
    return this.http.post(this.url.apiUrl + "bluewallet/getgraphdata", data, this.header.getHttpHeader());
  }

}
