import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  dashboardSelected() {
    if (sessionStorage.getItem("roleName") == "admin") {
      // this.route.navigate(['admin-dashboard']);
      this.route.navigate(['dashboard']);
    } else {
      this.route.navigate(['dashboard']);
    }

  }


  cardSelected() {
    if (sessionStorage.getItem("roleName") == "admin") {
      this.route.navigate(['admin-user-list']);
    } else {
      this.route.navigate(['card']);
    }
  }

  vaultSelected() {
    if (sessionStorage.getItem("roleName") == "admin") {
      // this.route.navigate(['admin-vault']);
      this.route.navigate(['vault']);
    } else {
      this.route.navigate(['vault']);
    }
  }

  buyAndSellSelected() {
    if (sessionStorage.getItem("roleName") == "admin") {
      this.route.navigate(['buyandsell']);
    } else {
      this.route.navigate(['buyandsell']);
    }
  }

  profileSelected() {
    if (sessionStorage.getItem("roleName") == "admin") {
      this.route.navigate(['profile']);
    } else {
      this.route.navigate(['profile']);
    }
  }

  

  logOut() {
    sessionStorage.clear();
    this.route.navigate(['']);
  }
}
