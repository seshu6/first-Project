import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'blue-wallet';
  showOrHideSidebar: boolean = false;
  constructor(private route: Router) {
    route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == "/" || event['url'] == "/login" || event['url'] == "/createwallet" || event['url'] == "/verification") {
          this.showOrHideSidebar = false;
        } else {
          this.showOrHideSidebar = true;
        }
      }
    })
  }

}




