import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'blue-wallet';
  showOrHideSidebar: boolean = false;
  urlArray = location.href.split("/");
  urlIndexNumber: number = 0;
  constructor(private route: Router, private commonService: CommonService) {
    route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == "/" || event['url'] == "/login" || event['url'] == "/createwallet" || event['url'] == "/verification" || event['url'] == "/privacy" || event['url'] == "/api" || event['url'] == "/termsandservices") {
          this.showOrHideSidebar = false;
        } else {
          this.showOrHideSidebar = true;
        }
      }
    })
    this.commonService.setCustomUrl(location.href);
    
  }



}




