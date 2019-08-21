import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roleName = sessionStorage.getItem("roleName");
  profileActive: boolean;
  dashboardActive: boolean = true;
  cardActive: boolean;
  userListActive: boolean;
  vaultActive: boolean;
  buyAndSellActive: boolean;

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  activateSideBar(menu: string) {
    switch (menu) {
      case "profile":
        this.profileActive = true;
        this.dashboardActive = false;
        this.cardActive = false;
        this.userListActive = false;
        this.vaultActive = false;
        this.buyAndSellActive = false;
        break;
      case "dashboard":
        this.profileActive = false;
        this.dashboardActive = true;
        this.cardActive = false;
        this.userListActive = false;
        this.vaultActive = false;
        this.buyAndSellActive = false;
        break;
      case "card":
        this.profileActive = false;
        this.dashboardActive = false;
        this.cardActive = true;
        this.userListActive = false;
        this.vaultActive = false;
        this.buyAndSellActive = false;
        break;
      case "userlist":
        this.profileActive = false;
        this.dashboardActive = false;
        this.cardActive = false;
        this.userListActive = true;
        this.vaultActive = false;
        this.buyAndSellActive = false;
        break;
      case "vault":
        this.profileActive = false;
        this.dashboardActive = false;
        this.cardActive = false;
        this.userListActive = false;
        this.vaultActive = true;
        this.buyAndSellActive = false;
        break;
      case "buyandsell":
        this.profileActive = false;
        this.dashboardActive = false;
        this.cardActive = false;
        this.userListActive = false;
        this.vaultActive = false;
        this.buyAndSellActive = true;
        break;

    }

  }

  // dashboardSelected() {
  //   if (this.roleName == "admin") {
  //     // this.route.navigate(['admin-dashboard']);
  //     this.route.navigate(['dashboard']);
  //   } else {
  //     this.route.navigate(['dashboard']);
  //   }

  // }


  // cardSelected() {
  //   if (this.roleName == "admin") {
  //     this.route.navigate(['admin-user-list']);
  //   } else {
  //     this.route.navigate(['card']);
  //   }
  // }

  // vaultSelected() {
  //   if (this.roleName == "admin") {
  //     // this.route.navigate(['admin-vault']);
  //     this.route.navigate(['vault']);
  //   } else {
  //     this.route.navigate(['vault']);
  //   }
  // }

  // buyAndSellSelected() {
  //   if (this.roleName == "admin") {
  //     this.route.navigate(['buyandsell']);
  //   } else {
  //     this.route.navigate(['buyandsell']);
  //   }
  // }

  // profileSelected() {
  //   if (this.roleName == "admin") {
  //     this.route.navigate(['profile']);
  //   } else {
  //     this.route.navigate(['profile']);
  //   }
  // }



  logOut() {
    sessionStorage.clear();
    this.route.navigate(['']);
  }

  
}
