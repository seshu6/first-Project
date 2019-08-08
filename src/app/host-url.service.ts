import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostUrlService {
  // SERVER
  // tokenUrl: string = "http://bluwallet.colan.in/bluewallet-0.0.1-SNAPSHOT/oauth/token"
  // apiUrl: string = "http://bluwallet.colan.in/bluewallet-0.0.1-SNAPSHOT/API/"

  // THEVYAKANNI
  // tokenUrl: string = "http://192.168.2.78:9090/oauth/token";
  // apiUrl: string = "http://192.168.2.78:9090/API/";

  // KARTHICK
  tokenUrl: string = "http://192.168.2.19:9091/oauth/token";
  apiUrl: string = "http://192.168.2.19:9091/API/";

  // TEMPORARY SERVER
  // tokenUrl: string = "http://bluwallet.colan.in/oauth/token";
  // apiUrl: string = "http://bluwallet.colan.in/API/";
}
