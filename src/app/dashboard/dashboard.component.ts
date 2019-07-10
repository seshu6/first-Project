import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,private route:Router) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

  }


  goToKyc(){
    this.route.navigate(['dashboard/kyc']);
  }
}

