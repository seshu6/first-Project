import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class CommonAuthenticationService {
  constructor(private route: Router, private spinner: LoaderService) { }


  // COMMON HEADERS
  getHttpHeader(): {} {
    const tokenObj = JSON.parse(sessionStorage.getItem('tokenObj'));

    if (tokenObj != null) {
      let httpHeaders = new HttpHeaders({
        'Authorization': 'bearer ' + tokenObj.access_token,
        'Content-Type': 'application/json;charset=UTF-8',
      });

      let header = {
        headers: httpHeaders
      }
      return header;
    } else {
      this.spinner.showOrHide(false);
      Swal.fire("Error", "Unauthorized", "error");
      this.route.navigate(['login']);
    }

  }

  // UPLOAD HEADERS


  getHttpHeaderWithoutAccess() {


    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    });

    let header = {
      headers: httpHeaders
    }
    return header;


  }


  getUploadHttpHeader(): {} {
    const tokenObj = JSON.parse(sessionStorage.getItem('tokenObj'));
    if (tokenObj != null) {
      let httpHeaders = new HttpHeaders({
        'Authorization': 'bearer ' + tokenObj.access_token,
      });

      let header = {
        headers: httpHeaders
      }
      return header;
    } else {
      this.spinner.showOrHide(false);
      Swal.fire("Error", "Unauthorized", "error");
      this.route.navigate(['login']);
    }
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
