import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('custom').then(data => {

    }).catch(error => {
      console.log("Error occur in loading dynamic script");
    })
  }

}
