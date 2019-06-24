import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostUrlService {
  tokenUrl: string = "http://192.168.2.78:9090/oauth/token";
  apiUrl: string = "http://192.168.2.78:9090/API/bluewallet/";
}
