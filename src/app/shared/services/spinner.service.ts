import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor( private spinnerService: NgxSpinnerService) { }
  spinner() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 500)
  }
  spinnerShow() {
    this.spinnerService.show()
  }
  spinnerHide() {
    this.spinnerService.hide()
  }
}
