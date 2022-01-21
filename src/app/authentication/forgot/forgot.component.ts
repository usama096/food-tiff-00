import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { AuthService } from '../services/auth.service';
import { forgotPassword } from '../state/auth.action';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor
    (
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private SpinnerService: SpinnerService,
      private store: Store,
  ) {
    this.forgotForm = this.fb.group({
      mobileNumber: ['03206928752', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    })
  }

  ngOnInit(): void {
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.forgotForm.controls[controlName]
    if (!control)
      return false;
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  onSubmit(): void {
    if (!this.forgotForm.valid) {
      this.forgotForm.markAllAsTouched()
    }
    let payload = {
      mobileNumber: this.forgotForm.get('mobileNumber')?.value
    }
    if (payload.mobileNumber.length < 11 || payload.mobileNumber.length > 11) {
      return;
    }

    this.store.dispatch(forgotPassword({ payload }));
    this.store.select((state: any) => state.auth.authResponse).subscribe(
      (res) => {
       this.router.navigate(['../verify-otp'], { relativeTo: this.route, queryParams: { mobileNumber: payload.mobileNumber, mode: 'reset' } })

      }
    )
    // this.SpinnerService.spinnerShow()
    // let data = {
    //   mobileNumber: this.forgotForm.get('mobileNumber')?.value
    // }
    // if (data.mobileNumber.length < 11 || data.mobileNumber.length > 11) {
    //   return;
    // }
    // this.authService.forgotPassword(data).subscribe(
    //   (res) => {
    //     console.log(res)
    //     this.router.navigate(['../verify-otp'], { relativeTo: this.route, queryParams: { mobileNumber: data.mobileNumber, mode: 'reset' } })
    //   },
    //   (err) => {
    //     console.error(err)
    //     this.SpinnerService.spinnerHide()
    //   },
    //   () => this.SpinnerService.spinnerHide(),
    // )
  }
}
