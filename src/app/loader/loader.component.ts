import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading: any = false;


  constructor(private spinner: LoaderService) { }

  ngOnInit() {
    this.spinner.loadingObservable$.subscribe((data) => {
      this.loading = data;
    })
  }
  ngOnDestroy() {

  }
}
