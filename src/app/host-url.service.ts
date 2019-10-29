import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HostUrlService {
  constructor(private http: HttpClient) { }

  // SERVER
  // tokenUrl: string = "http://bluwallet.colan.in/bluewallet-0.0.1-SNAPSHOT/oauth/token"
  // apiUrl: string = "http://bluwallet.colan.in/bluewallet-0.0.1-SNAPSHOT/API/"

  // THEVYAKANNI
  // tokenUrl: string = "http://192.168.2.78:9090/oauth/token";
  // apiUrl: string = "http://192.168.2.78:9090/API/";

  // KARTHICK
  // tokenUrl: string = "http://192.168.2.19:9091/oauth/token";
  // apiUrl: string = "http://192.168.2.19:9091/API/";

  // TEMPORARY SERVER
  // tokenUrl: string = "http://bluwallet.colan.in/oauth/token";
  // apiUrl: string = "http://bluwallet.colan.in/API/";

  // VINAY
  // tokenUrl: string = "http://192.168.2.37:9091/oauth/token";
  // apiUrl: string = "http://192.168.2.37:9091/API/";

  // PUBLIC IP
  // tokenUrl: string = "http://35.176.189.200:8080/bluewallet-0.0.1-SNAPSHOT/oauth/token";
  // apiUrl: string = "http://35.176.189.200:8080/bluewallet-0.0.1-SNAPSHOT/API/";

  // PUBLIC DOMAIN
  // tokenUrl: string = "https://coinways.io/bluewallet-0.0.1-SNAPSHOT/oauth/token";
  // apiUrl: string = "https://coinways.io/bluewallet-0.0.1-SNAPSHOT/API/";

  tokenUrl: string = "";
  apiUrl: string = "";

  getSettingJson(): Observable<any> {
    return this.http.get("./assets/config/settings.json");
  }

   getBaseUrl() {
    const result = this.http.get("./assets/config/settings.json").toPromise();
    // console.log(result);
    // this.getSettingJson().subscribe(url => {
    //   this.tokenUrl = url.tokenUrl;
    //   this.apiUrl = url.apiUrl;
    // })
  }

  async getJsonDetails() {
    var result = await this.http.get("./assets/config/settings.json").toPromise();
    this.tokenUrl = result['tokenUrl'];
    this.apiUrl = result['apiUrl'];
  }

}

