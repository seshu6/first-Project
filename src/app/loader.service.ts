import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  _loadingSubject = new Subject<any>();
  loadingObservable$ = this._loadingSubject.asObservable();

  constructor() { }

  showOrHide(data:boolean){
    this._loadingSubject.next(data);
  }

}
