import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { } 

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })

  }

}
