import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { AuthService } from '../services/auth.service';
import { resetPassword } from '../state/auth.action';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm!: FormGroup;
  hide: boolean = true;
  hidee: boolean = true;
  token!: string;

  constructor
    (
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private spinnerService: SpinnerService,
      private store: Store,
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    }, { validator: this.passwordMatch.bind(this) });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.token = params.token
      }
    )
  }

  passwordMatch(c: AbstractControl) {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      c.get('confirmPassword')?.setErrors({ match: true });
    }
    return null;
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.resetForm.controls[controlName]
    if (!control)
      return false;
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  goBack() {
    window.history.back();
  }
  onSubmit(): void {
    if (!this.resetForm.valid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    let payload = {
      password: this.resetForm.get('password')?.value,
      token: this.token
    }
    debugger
    this.store.dispatch(resetPassword({ payload }));
    this.store.select((state: any) => state.auth.authResponse).subscribe(
      (res) => {
        if (res.Status === 'Success') {
          this.router.navigate(['../saved'], { relativeTo: this.route })

        }
      }
    )
    // this.spinnerService.spinnerShow();
    // this.authService.resetPassword(data.password, data.token).subscribe(
    //   (res) => {
    //     if (res.Status === 'Success') {
    //       this.router.navigate(['../saved'], { relativeTo: this.route })
    //     }
    //   },
    //   (err) => {
    //     console.error(err)
    //     this.spinnerService.spinnerHide();
    //   },
    //   () => this.spinnerService.spinnerHide()
    // )
  }
}
