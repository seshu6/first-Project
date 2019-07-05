import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css']
})
export class ApiDetailsComponent implements OnInit {
  showOrHidePython: boolean = true;
  showOrHideJava: boolean = false;
  showOrHideNet: boolean = false;
  showOrHideRuby: boolean = false;
  showOrHidePhp: boolean = false;
  showOrHideNode: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onTabChanged(data: string) {
    if (data == "python") {
      this.showOrHidePython = true;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "java") {
      this.showOrHidePython = false;
      this.showOrHideJava = true;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "net") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = true;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "ruby") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = true;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "php") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = true;
      this.showOrHideNode = false;
    } else if (data == "node") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = true;
    }
  }

}
