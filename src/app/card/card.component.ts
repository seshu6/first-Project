import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CardService } from '../card.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class CardComponent implements OnInit {
  monthArray: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth: string = "January";
  selectedAmountMode: string = "All";
  selectedCurrencyType: string = "BTC"
  chartDataArr: any[] = [];
  receivedXAxisChartData: any[] = [];
  receivedYAxisChartData: any[] = [];
  paidXAxisChartData: any[] = [];
  paidYAxisChartData: any[] = [];
  xAxisChartData: any[] = [];
  showOrHideMonthList: boolean = false;
  showOrHideAmountMode: boolean = false;
  showOrHideCryptoType: boolean = false;
  paidBackgroudColor: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ];
  paidBorderColor: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];
  receivedBackgroundColor: string[] = [
    'rgba(51,51,51,0.59)',
    'rgba(51,51,51,0.59)',
    'rgba(51,51,51,0.59)',
    'rgba(51,51,51,0.59)',
    'rgba(51,51,51,0.59)',
    'rgba(51,51,51,0.59)'
  ];
  receivedBorderColor: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  // CHARTS DETAILS STARTS HERE

  // CHART OPTIONS
  lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }, gridLines: {
          display: false
        }
      }]
    }
  };


  // CHART Y_AXIS DETAILS
  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Send' },
    { data: [20, 30, 10, 50, 40, 100, 5], label: 'Received' },
  ];

  // CHART X_AXIS DETAILS
  lineChartLabels: Label[] = ["January", "February", "March", "April", "May", "June", "July"];

  // OTHER CHART DETAILS
  lineChartColors: Color[] = [
    {
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ]
    }, {
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      backgroundColor: [
        'rgba(51,51,51,0.59)',
        'rgba(51,51,51,0.59)',
        'rgba(51,51,51,0.59)',
        'rgba(51,51,51,0.59)',
        'rgba(51,51,51,0.59)',
        'rgba(51,51,51,0.59)'
      ]
    },
  ];
  lineChartLegend = false;
  lineChartType = 'line';
  lineChartPlugins = [];
  // ENDS HERE

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private spinner: NgxSpinnerService, private cardService: CardService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.getChartDetails();
  }

  getChartDetails() {
    this.spinner.show();
    let jsonData = {};
    if (this.selectedCurrencyType == "BTC") {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "fetchAmountFlag": this.selectedAmountMode,
        "cryptoType": "BTCTEST",
        "month": this.selectedMonth
      }
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "fetchAmountFlag": this.selectedAmountMode,
        "cryptoType": "ETH",
        "month": this.selectedMonth
      }
    }
    this.cardService.postChartDetails(jsonData).subscribe(success => {
      this.spinner.hide();
      if (success['status'] == "success") {
        this.receivedXAxisChartData = [];
        this.receivedYAxisChartData = [];
        this.paidXAxisChartData = [];
        this.paidYAxisChartData = [];
        // this.lineChartLabels = [];
        for (let i = 0; i < success['listCalculatingAmountDTO'].length; i++) {
          if (success['listCalculatingAmountDTO'][i].hasOwnProperty("receivedAmount")) {
            // this.receivedXAxisChartData.push(success['listCalculatingAmountDTO'][i]['Date']);
            this.receivedYAxisChartData.push(success['listCalculatingAmountDTO'][i]['receivedAmount']);
          }
          if (success['listCalculatingAmountDTO'][i].hasOwnProperty("paidAmount")) {
            // this.paidXAxisChartData.push(success['listCalculatingAmountDTO'][i]['Date']);
            this.paidYAxisChartData.push(success['listCalculatingAmountDTO'][i]['paidAmount']);
          }
          // this.lineChartLabels.push(success['listCalculatingAmountDTO'][i]['Date']);
        }



        console.log("received date", this.receivedXAxisChartData);
        console.log("received data", this.receivedYAxisChartData);
        console.log("paid date", this.paidXAxisChartData);
        console.log("paid data", this.paidYAxisChartData);
      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.hide();
    })
  }

}
