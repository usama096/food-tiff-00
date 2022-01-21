import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpUser } from '../models/auth-model';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Store } from '@ngrx/store';
import { signUp } from '../state/auth.action';
import { AuthState } from '../state/auth.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  hide: boolean = true;
  hidee: boolean = true;
  signUpUser!: SignUpUser

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store<AuthState>
  ) {
    this.signupForm = this.fb.group({
      firstName: ['Ahmad', [Validators.required, Validators.minLength(4)]],
      lastName: ['Dota', [Validators.required, Validators.minLength(4)]],
      mobileNumber: ['03464001326', [Validators.required]],
      email: ['ahmad26@gmail.com', [Validators.required, Validators.email]],
      password: ['Ahmad#@26', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: [''],
    }, { validator: this.passwordMatch.bind(this) })

  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    let payload: SignUpUser = {
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      email: this.signupForm.get('email')?.value,
      mobileNumber: this.signupForm.get('mobileNumber')?.value,
      password: this.signupForm.get('password')?.value,
      userType: 'CUSTOMER'
    }
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched()
      return
    }
    this.store.dispatch(signUp({ payload }))
    this.store.select((state: any) => state.auth.errorMessage).subscribe(
      (res: any) => {
        if (res && res.status === 200) {
          this.router.navigate(['../verify-otp'], { relativeTo: this.route, queryParams: { mobileNumber: payload.mobileNumber, mode: 'signup' } },)
        }
      },
    );

    // this.spinnerService.spinnerShow()
    // let data: SignUpUser = {
    //   firstName: this.signupForm.get('firstName')?.value,
    //   lastName: this.signupForm.get('lastName')?.value,
    //   email: this.signupForm.get('email')?.value,
    //   mobileNumber: this.signupForm.get('mobileNumber')?.value,
    //   password: this.signupForm.get('password')?.value,
    //   userType: 'CUSTOMER'
    // }
    // this.authService.signUpUser(data).subscribe((res) => {
    //   console.log(res)
    // }, (error) => {
    //   this.router.navigate(['../verify-otp'], { relativeTo: this.route, queryParams: { mobileNumber: data.mobileNumber, mode: 'signup' } },)
    //   console.error(error)
    //   this.spinnerService.spinnerHide()
    // },
    //   () => this.spinnerService.spinnerHide(),
    // );
  }

  passwordMatch(c: AbstractControl) {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      // c.get('confirmPassword')?.setErrors({ match: true });

    }
    return null
  }
  hasError(controlName: string, validationType: string): boolean {
    const control = this.signupForm.controls[controlName]
    if (!control)
      return false;
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
