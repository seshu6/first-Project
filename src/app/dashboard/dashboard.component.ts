import { Component, OnInit, HostListener } from '@angular/core';
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

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


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
  overlayClassShowOrHide: boolean = false;
  sendHighLight: boolean = false;
  requestHighLight: boolean = false;
  qrCodeAmount: number;
  qrImgSrc: string;
  qrWalletAddress: string;
  sendEthOrBtcAmount: string | number;
  requestEthOrBtcAmount: string | number;
  sendEthOrBtcAmountUsd: string | number;
  requestEthOrBtcAmountUsd: string | number;
  requestWalletAddress: string;
  sendWalletAddress: string;
  requestIdCounter: number = 0;
  requestId: any;
  todayAmount: string | number;
  weekAmount: string | number;
  monthAmount: string | number;
  successShowOrHide: boolean = false;
  copied: string = "Copy All";
  roleName: string = sessionStorage.getItem('roleName');
  userId: string | number = sessionStorage.getItem('userId');
  kycShowOrHide: any;
  profileShowOrHide: any;
  refreshAlertModalShowOrHide: boolean = false;
  notificationId: string | number;
  notificationArr: any[] = [];
  notificationShowOrHide: boolean = false;
  increOrDecreHistoryIndex: number = 0;
  currentClickedIndex: string | number;
  previousClickedIndex: string | number;
  notificationObj: any = {};
  currentEthAmount: string | number;
  currentBtcAmount: string | number;
  currentEthAmountStatus: number;
  currentBtcAmountStatus: |number;


  // CHART CONFIGURATIONS STARTS HERE
  // lineChartOptions: any = {
  //   responsive: true,
  //   scales: {
  //     xAxes: [{
  //       gridLines: {
  //         display: false
  //       },
  //       afterFit: (scale) => {
  //         scale.height = 45;
  //       }
  //     }],
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true
  //       }, gridLines: {
  //         display: false
  //       }
  //     }]
  //   }
  // };


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


  // WEB SOCKET CODE STARTS HERE
  webSocketEndPoint: string = 'http://192.168.2.78:9090/socket';
  topic: string = "/topic/notification";
  stompClient: any;
  ws: any;
  webSocketObj: any;

  // ENDS HERE




  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, private route: Router, private spinner: LoaderService, private dashboardService: CommonDashboardService) {

  }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {

    })
    // $('.carousel-item1').carousel({
    //   onCycleTo: function (data) {
    //     alert("changed");
    //   }
    // });


    this.getActivityList();
  }


  // ngAfterViewInit() {
    // let elems = document.querySelectorAll('.carousel');
    // let instances = M.Carousel.getInstance(elems);

    // setTimeout(() => {
    //   let elem = document.querySelector('.carousel');
    //   let carouselInstances = M.Carousel.getInstance(elem);
    //   console.log("one");
    //   // if (Boolean(carouselInstances)) {

    //   // }
    //   carouselInstances.options.onCycleTo = (index) => {
    //     console.log(index);
    //     this.slideCrptoChange(index);
    //   };

    // }, 500);

    // let elem = document.querySelector('.carousel');
    // // let carouselInstances = M.Carousel.init(elem, this.options);
    // let carouselInstances = M.Carousel.getInstance(elem);
    // console.log(carouselInstances);
    // if (Boolean(carouselInstances)) {
    //   carouselInstances.options.onCycleTo = this.sayHello;
    // }
  // }


  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //  event.preventDefault();
  // }


  slideCrptoChange(index) {
    if (index.innerText == "BitCoin") {
      this.onSelectSliderCryptoCurrency("BTC");
    } else if (index.innerText == "Ethereum") {
      this.onSelectSliderCryptoCurrency("ETH");
    } else if (index.innerText == "Bitwing") {
      this.onSelectSliderCryptoCurrency("BWN");
    }

  }

  toggleDropDown(filter: string) {
    if (filter == "month") {
      this.showOrHideMonthList = !this.showOrHideMonthList;
      if (this.showOrHideAmountMode) {
        this.showOrHideAmountMode = false;
      }
      if (this.showOrHideCryptoType) {
        this.showOrHideCryptoType = false;
      }
    } else if (filter == "amount") {
      this.showOrHideAmountMode = !this.showOrHideAmountMode;
      if (this.showOrHideMonthList) {
        this.showOrHideMonthList = false;
      }
      if (this.showOrHideCryptoType) {
        this.showOrHideCryptoType = false;
      }
    } else if (filter == "crypto") {
      this.showOrHideCryptoType = !this.showOrHideCryptoType;
      if (this.showOrHideAmountMode) {
        this.showOrHideAmountMode = false;
      }
      if (this.showOrHideMonthList) {
        this.showOrHideMonthList = false;
      }
    }
  }

  onSelectSliderCryptoCurrency(crypto: string) {
    this.sendEthOrBtcAmount = "";
    this.sendEthOrBtcAmountUsd = "";
    this.requestEthOrBtcAmountUsd = "";
    this.requestEthOrBtcAmount = "";
    this.requestWalletAddress = "";
    this.sendWalletAddress = "";
    this.selectedCurrencyType = crypto;
    this.getActivityList("slider");
  }



  connect() {
    this.ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(this.ws);
    const _this = this;
    _this.stompClient.debug = null;
    _this.stompClient.connect({}, function (frame) {

      _this.stompClient.subscribe('/topic/reply', function (notification) {
        const branchData = JSON.parse(notification.body);
        if (this.userId == branchData['showNotificationid']) {
          this.notificationArr.push(branchData);
        }

      })

    }, this.errorCallBack);
  };


  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }

  }

  errorCallBack(error) {

    setTimeout(() => {
      this.connect();
    }, 5000);
  }
  // ENDS HERE


  avoidNumber(e: any) {
    if (["e", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
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
        this.kycShowOrHide = success['CalculatingAmountDTO'].kycStatus;
        this.profileShowOrHide = success['CalculatingAmountDTO'].profileStatus;
        this.todayAmount = success['CalculatingAmountDTO'].todayAmount;
        this.weekAmount = success['CalculatingAmountDTO'].weekaAmount;
        this.monthAmount = success['CalculatingAmountDTO'].monthAmount;
        this.currentEthAmount = success['CalculatingAmountDTO'].currentUsdforEther;
        this.currentBtcAmount = success['CalculatingAmountDTO'].currentUsdforBtc;
        this.currentEthAmountStatus = success['CalculatingAmountDTO'].ethStatus;
        this.currentBtcAmountStatus = success['CalculatingAmountDTO'].btcStatus;

        if (this.selectedCurrencyType == "BTC") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].btcAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdforBtc;
          this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType, this.btcOrEthBalance, this.btcOrEthUsdDollar);
        } else if (this.selectedCurrencyType == "ETH") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].etherAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdforEther;
          this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType, this.btcOrEthBalance, this.btcOrEthUsdDollar);
        } else if (this.selectedCurrencyType == "BWN") {
          this.btcOrEthBalance = success['CalculatingAmountDTO'].bwnAmount;
          this.btcOrEthUsdDollar = success['CalculatingAmountDTO'].usdForBwn;
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

    this.spinner.showOrHide(true);
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "cryptoType": this.selectedCurrencyType
    }
    this.dashboardService.postQrCodeGenerator(jsonData).subscribe(success => {

      if (success['status'] == "success") {
        if (this.selectedCurrencyType == "BTC") {
          this.qrCodeAmount = success['loginInfo'].btcAmount;
          this.qrImgSrc = success['loginInfo'].qrCode;
          this.qrWalletAddress = success['loginInfo'].bitcoinWalletAddress;
        } else if (this.selectedCurrencyType == "ETH" || this.selectedCurrencyType == "BWN") {
          this.qrCodeAmount = success['loginInfo'].etherAmount;
          this.qrImgSrc = success['loginInfo'].qrCode;
          this.qrWalletAddress = success['loginInfo'].EtherwalletAddress;
        }
        this.copied = "Copy All";
        this.spinner.showOrHide(false);
        this.qrCodeModalShowOrHide = !this.qrCodeModalShowOrHide;
        this.qrCodeClassShowOrHide = !this.qrCodeClassShowOrHide;
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

  // copyToClipboard(inputElement) {

  //   inputElement.select();
  //   document.execCommand('copy');
  //   inputElement.setSelectionRange(0, this.qrWalletAddress.length);
  // }

  copyToClipboard(item): void {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
    this.copied = "copied";
  }

  requestHighLighter() {
    this.overlayClassShowOrHide = !this.overlayClassShowOrHide;
    this.requestHighLight = false;
    this.sendHighLight = true;
  }

  sendHighLighter() {
    this.overlayClassShowOrHide = !this.overlayClassShowOrHide;
    this.sendHighLight = false;
    this.requestHighLight = true;
  }


  // setCarouselSlidingFun() {
  //   let elem = document.querySelector('.carousel');
  //   let carouselInstances = M.Carousel.getInstance(elem);
  //   carouselInstances.options.onCycleTo = (index) => {
  //     console.log(index);
  //     this.slideCrptoChange(index);
  //   };
  // }


  getActivityList(fromSlider?: string) {
    // this.dashboardService.sliderFromDashboardToParent(this.selectedCurrencyType);
    if (fromSlider != "slider") {
      let index: number = 0;
      let elem = document.querySelector('.carousel');
      let carouselInstances = M.Carousel.getInstance(elem);
      // carouselInstances.options.onCycleTo = (index) => {
      //   console.log(index);
      //   this.slideCrptoChange(index);
      // };
      // if (carouselInstances != undefined) {
      //   carouselInstances.options.draggable = false;
      // }

      // carouselInstances.onCycleTo = () => {
      //   alert("changed");
      // }
      if (this.selectedCurrencyType == "BTC") {
        index = 0;
      } else if (this.selectedCurrencyType == "ETH") {
        index = 1;
      } else if (this.selectedCurrencyType == "BWN") {
        index = 2;
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
    } else if (this.selectedAmountMode == "Request") {
      amountMode = "requested";
    }
    // if (this.selectedCurrencyType == "BTC") {
    //   jsonData = {
    //     "userId": sessionStorage.getItem("userId"),
    //     "fetchAmountFlag": amountMode,
    //     "cryptoType": "BTC",
    //     "flagfordates": this.dayWeekMonth
    //   }
    // } else if (this.selectedCurrencyType == "ETH") {
    //   jsonData = {
    //     "userId": sessionStorage.getItem("userId"),
    //     "fetchAmountFlag": amountMode,
    //     "cryptoType": "ETH",
    //     "flagfordates": this.dayWeekMonth
    //   }
    // } else if (this.selectedCurrencyType == "BWN") {
    //   jsonData = {
    //     "userId": sessionStorage.getItem("userId"),
    //     "fetchAmountFlag": amountMode,
    //     "cryptoType": "BWN",
    //     "flagfordates": this.dayWeekMonth
    //   }
    // }
    jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "fetchAmountFlag": amountMode,
      "cryptoType": this.selectedCurrencyType,
      "flagfordates": this.dayWeekMonth
    }
    this.dashboardService.postActivityList(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);

      if (success['status'] == "success") {
        this.increOrDecreHistoryIndex = 0;
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
    // if (this.selectedCurrencyType == "BTC") {
    //   jsonData = {
    //     "userId": sessionStorage.getItem("userId"),
    //     "fetchAmountFlag": amountMode,
    //     "cryptoType": "BTC",
    //     "month": this.selectedMonth
    //   }
    // } else if (this.selectedCurrencyType == "ETH") {
    //   jsonData = {
    //     "userId": sessionStorage.getItem("userId"),
    //     "fetchAmountFlag": amountMode,
    //     "cryptoType": "ETH",
    //     "month": this.selectedMonth
    //   }
    // } else if (this.selectedCurrencyType == "BWN") {
    //   jsonData = {
    //     "userId": sessionStorage.getItem("userId"),
    //     "fetchAmountFlag": amountMode,
    //     "cryptoType": "BWN",
    //     "month": this.selectedMonth
    //   }
    // }
    jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "fetchAmountFlag": amountMode,
      "cryptoType": this.selectedCurrencyType,
      "month": this.selectedMonth
    }

    this.dashboardService.postDashboardChartDetails(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);

      if (success['status'] == "success") {
        this.lineChartColors = [];
        this.lineChartData = [];
        this.lineChartLabels = success['sendReceiveGraphDetails'].datelist;
        this.yAxisPaidData = success['sendReceiveGraphDetails'].paidAmountList;
        this.yAxisReceivedData = success['sendReceiveGraphDetails'].receivedAmountList;
        if (this.lineChartLabels.length != 0) {
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
          // this.lineChartOptions = {};

          // this.lineChartOptions = {
          //   responsive: true,
          //   scales: {
          //     xAxes: [{
          //       ticks: {
          //         autoSkip: false,
          //         maxRotation: 45,
          //         minRotation: 45
          //       }
          //     }],
          //     yAxes: [{

          //     }]
          //   }
          // };
          // this.lineChartOptions = {
          //   tooltips: {
          //     enabled: true,
          //     mode: 'single',
          //     callbacks: {
          //       label: function (tooltipItems, data) {
          //         let indice = tooltipItems.index;
          //         return data.labels[indice] + ': ' + data.datasets[0].data[indice] + '';
          //       }
          //     }
          //   },
          //   showTooltips: true,
          //   responsive: true,
          //   scales: {
          //     xAxes: [{
          //       gridLines: {
          //         display: false
          //       }
          //     }],
          //     yAxes: [{
          //       ticks: {
          //         beginAtZero: true
          //       }, gridLines: {
          //         display: false
          //       }
          //     }]
          //   }
          // };
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
        }
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



  // AUTO COMPLETE(CONVERSION OF USD TO BTC AND ETH)

  onAutoCompleteUsdToBtcAndETh(amount: string | number, sendOrRequest: string) {
    let jsonData = {
      "usd": amount,
      "cryptoType": this.selectedCurrencyType
    }
    this.dashboardService.postAutoCompleteUsdToBtcAndEth(jsonData).subscribe(success => {

      if (success['status'] == "success") {
        if (sendOrRequest == "send") {
          this.sendEthOrBtcAmount = success['CalculatingAmountDTO'].cryptoAmount;
        } else {
          this.requestEthOrBtcAmount = success['CalculatingAmountDTO'].cryptoAmount;
        }


      } else if (success['status'] == "failure") {
        if (sendOrRequest == "send") {
          this.sendEthOrBtcAmount = 0;
        } else {
          this.requestEthOrBtcAmount = 0;
        }
        // Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }

    })
  }


  // AUTO COMPLETE(CONVERSION OF BTC,ETH,BWN TO USD)
  onAutoCompleteUsdToCrypto(cryptoAmount: number | string, sendOrRequest: string) {
    let jsonData = {};
    if (this.selectedCurrencyType == "BTC") {
      jsonData = {
        "btcAmount": cryptoAmount,
        "cryptoType": this.selectedCurrencyType,
        "where": "dashboard",
        "userId":sessionStorage.getItem("userId")
      }
    } else if (this.selectedCurrencyType == "ETH") {
      jsonData = {
        "etherAmount": cryptoAmount,
        "cryptoType": this.selectedCurrencyType,
        "where": "dashboard",
        "userId":sessionStorage.getItem("userId")
      }
    } else if (this.selectedCurrencyType == "BWN") {
      jsonData = {
        "bwnAmount": cryptoAmount,
        "cryptoType": this.selectedCurrencyType,
        "where": "dashboard",
        "userId":sessionStorage.getItem("userId")
      }
    }

    this.dashboardService.postAutoCompleteEthOrBtcEstimation(jsonData).subscribe(success => {
      if (success['status'] == "success") {
        if (sendOrRequest == "Send") {
          if (this.selectedCurrencyType == "BTC") {
            this.sendEthOrBtcAmountUsd = success['CalculatingAmountDTO'].usdforBtc;
          } else if (this.selectedCurrencyType == "ETH" || this.selectedCurrencyType == "BWN") {
            this.sendEthOrBtcAmountUsd = success['CalculatingAmountDTO'].usdforEther;
          }
        } else if (sendOrRequest == "Received") {
          if (this.selectedCurrencyType == "BTC") {
            this.requestEthOrBtcAmountUsd = success['CalculatingAmountDTO'].usdforBtc;
          } else if (this.selectedCurrencyType == "ETH" || this.selectedCurrencyType == "BWN") {
            this.requestEthOrBtcAmountUsd = success['CalculatingAmountDTO'].usdforEther;
          }
        }

      } else if (success['status'] == "failure") {
        Swal.fire("Error", success['message'], "error");
      }



    }, error => {
      // this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }

    })



  }





  // REQUEST CRYPTO

  requestBtcOrEth() {
    // this.spinner.showOrHide(true);
    this.refreshAlertModalShowOrHide = true;
    let jsonData = {
      "userId": sessionStorage.getItem("userId"),
      "toAddress": this.requestWalletAddress,
      "network": this.selectedCurrencyType,
      "requestAmount": this.requestEthOrBtcAmount
    };
    this.dashboardService.postRequestCryptoCurrency(jsonData).subscribe(success => {
      // this.spinner.showOrHide(false);
      this.refreshAlertModalShowOrHide = false;
      if (success['status'] == "success") {
        this.route.navigateByUrl('vault', { skipLocationChange: true }).then(() =>
          this.route.navigate(["dashboard"]));
        Swal.fire("Success", success['message'], "success");
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }else if (success['status'] == "info") {
        Swal.fire("Info", success['message'], "info");
      }
    }, error => {
      // this.spinner.showOrHide(false);
      this.refreshAlertModalShowOrHide = false;
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }

  sendCryptoCurreny() {
    if (this.selectedCurrencyType == "BTC") {
      this.sendBtcCryptoCurrency();
    } else if (this.selectedCurrencyType == "ETH") {
      this.sendEthCryptoCurrency();
    } else if (this.selectedCurrencyType == "BWN") {
      this.sendBwnCryptoCurrency();
    }
  }

  // SEND BTC
  sendBtcCryptoCurrency() {
    // this.spinner.showOrHide(true);
    this.refreshAlertModalShowOrHide = true;
    let jsonData = {};
    if (this.requestIdCounter == 1) {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "toBtcWalletAddress": this.sendWalletAddress,
        "btcAmount": this.sendEthOrBtcAmount,
        "exchangeStatus": 0,
        "requestId": this.requestId
      };
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "toBtcWalletAddress": this.sendWalletAddress,
        "btcAmount": this.sendEthOrBtcAmount,
        "exchangeStatus": 0
      };
    }

    this.dashboardService.postSendBtcCryptoCurrency(jsonData).subscribe(success => {
      // this.spinner.showOrHide(false);
      this.refreshAlertModalShowOrHide = false;
      if (success['status'] == "success") {
        this.route.navigateByUrl('vault', { skipLocationChange: true }).then(() =>
          this.route.navigate(["dashboard"]));
        Swal.fire("Success", success['message'], "success");
        this.requestIdCounter = 0;
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      // this.spinner.showOrHide(false);
      this.refreshAlertModalShowOrHide = false;
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }


  // SEND ETH
  sendEthCryptoCurrency() {
    // this.spinner.showOrHide(true);
    this.refreshAlertModalShowOrHide = true;
    let jsonData = {};
    if (this.requestIdCounter == 1) {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "toEthWalletAddress": this.sendWalletAddress,
        "etherAmount": this.sendEthOrBtcAmount,
        "exchangeStatus": 0,
        "requestId": this.requestId
      };
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "toEthWalletAddress": this.sendWalletAddress,
        "etherAmount": this.sendEthOrBtcAmount,
        "exchangeStatus": 0
      };
    }
    this.dashboardService.postSendEthCryptoCurrency(jsonData).subscribe(success => {
      // this.spinner.showOrHide(false);
      this.refreshAlertModalShowOrHide = false;
      if (success['status'] == "success") {
        this.route.navigateByUrl('vault', { skipLocationChange: true }).then(() =>
          this.route.navigate(["dashboard"]));

        this.requestIdCounter = 0;
        // this.successShowOrHide = true;
        Swal.fire("Success", success['message'], "success");
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      // this.spinner.showOrHide(false);
      this.refreshAlertModalShowOrHide = false;
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }


  // SEND BWN
  sendBwnCryptoCurrency() {
    this.refreshAlertModalShowOrHide = true;
    let jsonData = {};
    if (this.requestIdCounter == 1) {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "toEthWalletAddress": this.sendWalletAddress,
        "bitwingsAmount": this.sendEthOrBtcAmount,
        "exchangeStatus": 0,
        "requestId": this.requestId
      };
    } else {
      jsonData = {
        "userId": sessionStorage.getItem("userId"),
        "toEthWalletAddress": this.sendWalletAddress,
        "bitwingsAmount": this.sendEthOrBtcAmount,
        "exchangeStatus": 0
      };
    }
    this.dashboardService.postSendBwnCryptoCurrency(jsonData).subscribe(success => {
      this.refreshAlertModalShowOrHide = false;
      if (success['status'] == "success") {
        this.route.navigateByUrl('vault', { skipLocationChange: true }).then(() =>
          this.route.navigate(["dashboard"]));
        this.requestIdCounter = 0;
        Swal.fire("Success", success['message'], "success");
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      } else if (success['status'] == "info") {
        Swal.fire("Info", success['message'], "info");
      }
    }, error => {
      this.refreshAlertModalShowOrHide = false;
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }


  // NOTIFICATION LIST

  getNotificationList() {
    if (this.notificationShowOrHide) {
      this.notificationShowOrHide = false;
    } else {
      this.spinner.showOrHide(true);
      let jsonData = {
        "showNotificationid": this.userId
      }

      this.dashboardService.postNotificationList(jsonData).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          this.notificationArr = success['listNotification'];
          this.notificationShowOrHide = true;
          this.connect();
        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
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



  // NOTIFICATION STATUS
  changeNotificationStatus(obj: any) {
    this.notificationObj = obj;
    this.spinner.showOrHide(true);
    let jsonData = {
      "id": this.notificationObj.id
    }

    this.dashboardService.postChangeNotificationStatus(jsonData).subscribe(success => {
      this.spinner.showOrHide(false);
      if (success['status'] == "success") {

        if (this.notificationObj.type == "Received" || this.notificationObj.type == "Investment") {
          this.getActivityList("notification");
        } else if (this.notificationObj.hasOwnProperty("btcWalletAddress")) {
          this.selectedCurrencyType = "BTC";
          this.getActivityList("notification");
          this.onAutoCompleteUsdToBtcAndETh(this.notificationObj.usdforbtc, 'send');
          // this.ethOrBtc = "BTC";
          this.sendEthOrBtcAmountUsd = this.notificationObj.usdforbtc;
          this.sendWalletAddress = this.notificationObj.btcWalletAddress;

        } else if (this.notificationObj.hasOwnProperty("ethWalletAddress")) {
          this.selectedCurrencyType = "ETH";
          this.getActivityList("notification");
          this.onAutoCompleteUsdToBtcAndETh(this.notificationObj.usdforeth, 'send');
          // this.ethOrBtc = "ETH";
          this.sendEthOrBtcAmountUsd = this.notificationObj.usdforeth;
          this.sendWalletAddress = this.notificationObj.ethWalletAddress;

        }
        this.notificationShowOrHide = false;
        this.getNotificationList();
      } else if (success['status'] == "failure") {
        Swal.fire("Failure", success['message'], "error");
      }
    }, error => {
      this.spinner.showOrHide(false);
      if (error.error.error == "invalid_token") {
        Swal.fire("Info", "Session Expired", "info");
        this.route.navigate(['login']);
      }
    })
  }



  // onUnActivePrevious(index: string | number) {
  //   this.increOrDecreHistoryIndex++;
  //   this.currentClickedIndex = index;
  //   if (this.increOrDecreHistoryIndex == 1) {
  //     this.activityListArr[this.currentClickedIndex].active = true;
  //   } else {
  //     this.activityListArr[this.previousClickedIndex].active = false;
  //     this.activityListArr[this.currentClickedIndex].active = true;
  //   }
  //   this.previousClickedIndex = this.currentClickedIndex;
  // }




  autoFillSendDetails(obj: any, index: string | number) {
    this.increOrDecreHistoryIndex++;
    this.currentClickedIndex = index;
    if (this.increOrDecreHistoryIndex == 1) {
      this.activityListArr[this.currentClickedIndex].active = true;
    } else if (this.activityListArr[this.currentClickedIndex].active) {
      this.activityListArr[this.currentClickedIndex].active = false;
    }
    else {
      this.activityListArr[this.previousClickedIndex].active = false;
      this.activityListArr[this.currentClickedIndex].active = true;
    }

    this.previousClickedIndex = this.currentClickedIndex;
    if (obj.transactionType == "Request") {
      this.sendEthOrBtcAmount = obj.amount;
      this.sendEthOrBtcAmountUsd = obj.usdValue;
      this.sendWalletAddress = obj.toWalletAddress;
      this.requestId = obj.requestId;
      this.requestIdCounter++;
    }
  }



}

