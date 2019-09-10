import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CardService } from '../card.service';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';


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
  selectedMonth: string = this.monthArray[new Date().getMonth()];
  selectedAmountMode: string = "All";
  selectedCurrencyType: string = "BTC"
  chartDataArr: any[] = [];
  // receivedXAxisChartData: any[] = [];
  // receivedYAxisChartData: any[] = [];
  // paidXAxisChartData: any[] = [];
  // paidYAxisChartData: any[] = [];
  xAxisChartData: any[] = [];
  yAxisPaidData: any[] = [];
  yAxisReceivedData: any[] = [];
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
        },
        afterFit: (scale) => {
          scale.height = 50;
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
  lineChartLabels: Label[] = [];

  // OTHER CHART DETAILS
  lineChartColors: Color[] = [
    {
      borderColor: [
        'rgba(88, 170, 243, 1)',
        'rgba(88, 170, 243, 1)',
        'rgba(88, 170, 243, 1)',
        'rgba(88, 170, 243, 1)',
        'rgba(88, 170, 243, 1)',
        'rgba(88, 170, 243, 1)'
      ],
      backgroundColor: [
        'rgba(88, 170, 243, 0.7)',
        'rgba(88, 170, 243, 0.6)',
        'rgba(88, 170, 243, 0.4)',
        'rgba(88, 170, 243, 0.3)',
        'rgba(88, 170, 243, 0.2)',
        'rgba(88, 170, 243, 0.1)'
      ]
    }, {
      borderColor: [
        'rgba(249, 84, 119, 1)',
        'rgba(249, 84, 119, 1)',
        'rgba(249, 84, 119, 1)',
        'rgba(249, 84, 119, 1)',
        'rgba(249, 84, 119, 1)',
        'rgba(249, 84, 119, 1)'
      ],
      backgroundColor: [
        'rgba(255,124,110,0.6)',
        'rgba(255,124,110,0.5)',
        'rgba(255,124,110,0.4)',
        'rgba(255,124,110,0.3)',
        'rgba(255,124,110,0.2)',
        'rgba(255,124,110,0.1)'
      ]
    },
  ];
  lineChartLegend = false;
  lineChartType = 'line';
  lineChartPlugins = [];
  // ENDS HERE

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private spinner: LoaderService, private cardService: CardService, private route: Router) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
    this.getChartDetails();
  }

  // ngOnDestroy(){
  //   sessionStorage.setItem("active","card");
  // }



  getChartDetails() {
    this.spinner.showOrHide(true);
    let jsonData = {};
    let amountMode: string; 

    if (this.selectedAmountMode == "Paid") {
      amountMode = "send";
    } else if (this.selectedAmountMode == "Received") {
      amountMode = "received";
    } else {
      amountMode = "all";
    }
    if (this.selectedCurrencyType == "BTC") {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "fetchAmountFlag": amountMode,
        "cryptoType": "BTCTEST",
        "month": this.selectedMonth
      }
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "fetchAmountFlag": amountMode,
        "cryptoType": "ETH",
        "month": this.selectedMonth
      }
    }
    this.cardService.postChartDetails(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.lineChartColors = [];
        this.lineChartData = [];
        this.lineChartLabels = success['sendReceiveGraphDetails'].datelist;
        this.yAxisPaidData = success['sendReceiveGraphDetails'].paidAmountList;
        this.yAxisReceivedData = success['sendReceiveGraphDetails'].receivedAmountList;
        if (this.selectedAmountMode == "All") {
          this.lineChartData = [
            { data: this.yAxisPaidData, label: 'Send' },
            { data: this.yAxisReceivedData, label: 'Received' },
          ];

          this.lineChartColors = [
            {
              borderColor: [
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)'
              ],
              backgroundColor: [
                'rgba(88, 170, 243, 0.7)',
                'rgba(88, 170, 243, 0.6)',
                'rgba(88, 170, 243, 0.4)',
                'rgba(88, 170, 243, 0.3)',
                'rgba(88, 170, 243, 0.2)',
                'rgba(88, 170, 243, 0.1)'
              ]
            }, {
              borderColor: [
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)'
              ],
              backgroundColor: [
                'rgba(255,124,110,0.6)',
                'rgba(255,124,110,0.5)',
                'rgba(255,124,110,0.4)',
                'rgba(255,124,110,0.3)',
                'rgba(255,124,110,0.2)',
                'rgba(255,124,110,0.1)'
              ]
            },
          ];

        } else if (this.selectedAmountMode == "Paid") {
          this.lineChartData = [
            { data: this.yAxisPaidData, label: 'Send' },
          ];
          this.lineChartColors = [
            {
              borderColor: [
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)',
                'rgba(88, 170, 243, 1)'
              ],
              backgroundColor: [
                'rgba(88, 170, 243, 0.7)',
                'rgba(88, 170, 243, 0.6)',
                'rgba(88, 170, 243, 0.4)',
                'rgba(88, 170, 243, 0.3)',
                'rgba(88, 170, 243, 0.2)',
                'rgba(88, 170, 243, 0.1)'
              ]
            }
          ];
        } else if (this.selectedAmountMode == "Received") {
          this.lineChartData = [
            { data: this.yAxisReceivedData, label: 'Received' },
          ];
          this.lineChartColors = [
            {
              borderColor: [
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)',
                'rgba(249, 84, 119, 1)'
              ],
              backgroundColor: [
                'rgba(255,124,110,0.6)',
                'rgba(255,124,110,0.5)',
                'rgba(255,124,110,0.4)',
                'rgba(255,124,110,0.3)',
                'rgba(255,124,110,0.2)',
                'rgba(255,124,110,0.1)'
              ]
            }
          ];
        }

        this.lineChartOptions = {
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              afterFit: (scale) => {
                scale.height = 50;
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




      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }

}
