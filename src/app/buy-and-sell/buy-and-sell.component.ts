import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';

@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.css']
})
export class BuyAndSellComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

  }
  

}
