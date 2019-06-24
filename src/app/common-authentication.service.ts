import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonAuthenticationService {
  constructor() { }


  // COMMON HEADERS
  getHttpHeader(): {} {
    const tokenObj = JSON.parse(sessionStorage.getItem('tokenObj'));
    let httpHeaders = new HttpHeaders({
      'Authorization': 'bearer ' + tokenObj.access_token,
      'Content-Type': 'application/json;charset=UTF-8',
    });

    let header = {
      headers: httpHeaders
    }
    return header;
  }

  // OAUTH HEADERS
  getAuthHeader(): {} {
    let httpAuthHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('bluewallet-client:bluewallet-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    });

    let header = {
      headers: httpAuthHeaders
    }
    return header;
  }


}
