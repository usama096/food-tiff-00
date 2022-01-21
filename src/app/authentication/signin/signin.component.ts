import { AuthState, authReducer } from './../state/auth.reducer';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Store } from '@ngrx/store';
import { signIn } from '../state/auth.action';
import { SignIn } from '../state/auth.model';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  hide: boolean = true;
  errorMessage!: string;
  constructor
    (private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private spinerService: SpinnerService,
      private route: ActivatedRoute,
      private store: Store
    ) {

    this.signinForm = this.fb.group({
      mobileNumber: ['03206928752', [Validators.required]],
      password: ['Asd#@123', [Validators.required]]
    });

  }
  ngOnInit(): void {

  }

  onSubmit(): void {

    if (!this.signinForm.valid) {
      this.signinForm.markAllAsTouched();
      return
    }
    const payload: SignIn = {
      mobileNumber: this.signinForm.get('mobileNumber')?.value,
      password: this.signinForm.get('password')?.value,
    };
    this.spinerService.spinnerShow()
    this.store.dispatch(signIn({ payload }));
    this.store.select((state: any) => state.auth.token).subscribe(
      (token: any) => {
        if (token) {
          localStorage.setItem('accessToken', token);
          this.router.navigate(['/dashboard'], { queryParams: { mn: payload.mobileNumber } })
          this.spinerService.spinnerHide()
        }
      },

    );
    this.store.select((state: any) => state.auth.errorMessage).subscribe(
      (error: any) => {
        if (error && error.status === 401) {
          this.spinerService.spinnerHide()
          return this.errorMessage = error.message;
        } else if (error && error.status === 404) {
          this.spinerService.spinnerHide()
          return this.errorMessage = error.error;
        }
      });


    // this.spinerService.spinnerShow()
    // let data = {
    //   mobileNumber: this.signinForm.get('mobileNumber')?.value,
    //   password: this.signinForm.get('password')?.value,
    // }
    // this.authService.signInUser(data.mobileNumber, data.password).subscribe(
    //   (res) => {
    //     localStorage.setItem('accessToken', res.accessToken);
    //       this.router.navigate(['dashboard'], { queryParams: { mn: data.mobileNumber } })
    //   },
    //   (err) => {
    //    if(err.status === 401) {
    //      this.errorMessage = err.message
    //    }
    //    else if(err.status === 404) {
    //      this.errorMessage = err.error
    //    }
    //     this.spinerService.spinnerHide();
    //   },
    //   () => {
    //     this.spinerService.spinnerHide();
    //   }
    // )
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.signinForm.controls[controlName]
    if (!control)
      return false;
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}

