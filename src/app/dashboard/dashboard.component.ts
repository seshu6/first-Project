import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { CommonDashboardService } from '../common-dashboard.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import * as M from 'src/assets/materialize/js/materialize';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(-800px)' }),
        animate('500ms')
      ])
    ])

  ]
})
export class DashboardComponent implements OnInit {
  qrCodeModalShowOrHide: boolean = false;
  qrCodeClassShowOrHide: boolean = false;
  showOrHideMonthList: boolean = false;
  showOrHideAmountMode: boolean = false;
  monthArray: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth: string = this.monthArray[new Date().getMonth()];
  selectedAmountMode: string = "All";
  showOrHideCryptoType: boolean = false;
  selectedCurrencyType: string = "BTC";
  activityListArr: any[] = [];
  dayWeekMonth: string = "month";
  yAxisPaidData: any[] = [];
  yAxisReceivedData: any[] = [];
  searchFilter: any;
  btcOrEthBalance: string | number;
  ethOrBtc: string = "BTC";
  btcOrEthUsdDollar: string | number;


  // CHART CONFIGURATIONS STARTS HERE
  lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        afterFit: (scale) => {
          scale.height = 45;
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


  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Send' },
    { data: [], label: 'Received' },
  ];

  lineChartLabels: Label[] = [];

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
  counter: number = 0;

  // ENDS HERE
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private dashboardService: CommonDashboardService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

    // this.dashboardService.communicationObservable$.subscribe(() => {
    //   this.qrCodeModalShowOrHide = !this.qrCodeModalShowOrHide;
    //   this.qrCodeClassShowOrHide = !this.qrCodeClassShowOrHide;

    // })

    // this.dashboardService.sliderObservable$.subscribe((crypto) => {
    //   this.counter++
    //   this.selectedCurrencyType = crypto;
    //   if (this.counter > 1) {
    //     this.getActivityList();
    //   }



    // })


    this.getActivityList();
    // this.getBtcOrEthBalance("BTC");
    // this.getDashboardChartDetails();
  }


  onSelectSliderCryptoCurrency(crypto: string) {
    this.selectedCurrencyType = crypto;
    this.getActivityList("slider");
  }

  getBtcOrEthBalance(cryptoCurrency: string) {
    let currency = cryptoCurrency;
    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": currency
    }
    this.dashboardService.postBtcOrEthBalance(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        if (this.selectedCurrencyType == "ETH") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].etherAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdforEther;
          this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType, this.btcOrEthBalance, this.btcOrEthUsdDollar);
        } else {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].btcAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdforBtc;
          this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType, this.btcOrEthBalance, this.btcOrEthUsdDollar);
        }

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


  sliderCryptoClicked() {
    // this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType);
  }

  goToKyc() {
    this.route.navigate(['kyc']);
  }

  goToSmsVerify() {
    this.route.navigate(['verify']);
  }

  requestCryptoCurrency() {
    this.qrCodeModalShowOrHide = !this.qrCodeModalShowOrHide;
    this.qrCodeClassShowOrHide = !this.qrCodeClassShowOrHide;
  }


  getActivityList(fromSlider?: string) {
    // this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType);
    if (fromSlider != undefined) {
      let index: number = 0;
      let elem = document.querySelector('.carousel');
      let carouselInstances = M.Carousel.getInstance(elem);
      if (this.selectedCurrencyType == "BTC") {
        index = 0;
      } else if (this.selectedCurrencyType == "ETH") {
        index = 1;
      }
      if (carouselInstances != undefined) {
        carouselInstances.set(index);
      }

    }

    this.spinner.showOrHide(true);
    let amountMode: string;
    let jsonData = {};
    if (this.selectedAmountMode == "All") {
      amountMode = "All";
    } else if (this.selectedAmountMode == "Received") {
      amountMode = "Received";
    } else if (this.selectedAmountMode == "Paid") {
      amountMode = "send";
    }
    if (this.selectedCurrencyType == "BTC") {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "fetchAmountFlag": amountMode,
        "cryptoType": "BTCTEST",
        "flagfordates": this.dayWeekMonth
      }
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "fetchAmountFlag": amountMode,
        "cryptoType": "ETH",
        "flagfordates": this.dayWeekMonth
      }
    }

    this.dashboardService.postActivityList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {
        this.activityListArr = success['listCalculatingAmountDTO'];
        this.getDashboardChartDetails();

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


  // DASHBOARD CHART DETAILS
  getDashboardChartDetails() {
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
    this.dashboardService.postDashboardChartDetails(jsonData).subscribe(success => {
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
        this.lineChartOptions = {};

        this.lineChartOptions = {
          responsive: true,
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45
              }
            }],
            yAxes: [{

            }]
          }
        };
        this.getBtcOrEthBalance(this.selectedCurrencyType);
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

  // SLIDER FROM SIDEBAR
  callFromSideBarSlider() {

  }
}

