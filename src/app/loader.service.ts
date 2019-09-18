import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  _loadingSubject = new Subject<any>();
  loadingObservable$ = this._loadingSubject.asObservable();
  showOrHideStatus: boolean;

  constructor() { }

  showOrHide(data: boolean) {
    this.showOrHideStatus = data;
    this._loadingSubject.next(data);
  }

  getShowOrHideStatus() {
    return this.showOrHideStatus;
  }



}
