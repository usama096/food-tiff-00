import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AuthService } from '../services/auth.service';
import { otp, signUp } from '../state/auth.action';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any;
  otpValue!: string;
  phoneNumber!: string;
  token!: string;
  mode!: string;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "-",
    inputStyles: { width: "35px", height: "40px", },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store,
  ) { }
  ngOnInit(): void {
    this.store.select((state: any) => state.auth).subscribe(
      (res) => {
        if(!res){
          return;
        }
        if (res.otp) {
          this.router.navigate(['../reset-password'], { relativeTo: this.route, queryParams: { token: res.otp.token } })
        }
        if(res.otp){
          this.router.navigate(['/authentication'], { queryParams: { token: res.otp.token } })
        }
      }
    )

    this.route.queryParams
      .subscribe(params => {
        this.phoneNumber = params.phoneNumber
        this.mode = params.mode
      }
      );
  }
  goBack() {
    window.history.back()
  }
  onSubmit() {
    if (this.otpValue)
    if (this.otpValue.length === 6) {
      let payload = {
        otp: this.otpValue,
        phoneNumber: this.phoneNumber,
      }
      if (this.mode === 'reset') {
        this.store.dispatch(otp({ payload }));

      }
      if (this.mode === 'signup') {
        this.store.dispatch(otp({ payload }));
      }
      // this.spinnerService.spinnerShow();
      // this.authService.otp(this.otpValue, this.mobileNumber).subscribe(
      //   (res: any) => {
      //     if (this.mode === 'signup') {
      //       this.router.navigate(['../signin'], { relativeTo: this.route, queryParams: { token: res.User.token } })
      //     }
      //     else if (this.mode === 'reset') {
      //       this.router.navigate(['../reset-password'], { relativeTo: this.route, queryParams: { token: res.User.token } })
      //     }
      //   },
      //   (err) => {
      //     this.spinnerService.spinnerHide()
      //     console.error(err)
      //   },
      //   () => this.spinnerService.spinnerHide()
      // );
    }
  }
  onOtpChange(val: any) {
    this.otpValue = val;
  }
}
