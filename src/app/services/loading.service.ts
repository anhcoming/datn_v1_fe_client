
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private spinner: NgxSpinnerService) { }

  show() {
    this.isLoading.next(true);
    this.spinner.show();
  }

  hide() {
    this.isLoading.next(false);
    this.spinner.hide();
  }


}
