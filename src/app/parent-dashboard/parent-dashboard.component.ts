import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonDashboardService } from '../common-dashboard.service';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import Swal from 'sweetalert2';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class ParentDashboardComponent implements OnInit {
  qrCodeModalShowOrHide: boolean = false;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: NgxSpinnerService, private dashboardService: CommonDashboardService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
  }

  qrCodeModalOpenOrClose() {
    this.dashboardService.fromParentDashboardToDashboard();
  }
  qrCodeGenerate() {
    this.spinner.show();
    let jsonData = {
      "email": "tamiltheyvanst@gmail.com",
      "securedKey": "27296"
    }
    this.dashboardService.postQrCodeDetails(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {

      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
    })
  }

}