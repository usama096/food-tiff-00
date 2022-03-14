import { signUpSuccess } from './../state/auth.action';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpUser } from '../models/auth-model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
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
  pattern: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store<AuthState>
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.pattern)]],
      confirmPassword: [''],
    }, { validator: this.passwordMatch.bind(this) })

  }
  ngOnInit(): void {
    this.store.select((state: any) => state.auth).subscribe(res => {
        if(!res.signUpUser){
          return;
        }
        if (res.signUpUser) {
          this.router.navigate(['../verify-otp'], { relativeTo: this.route, queryParams: {phoneNumber: res.signUpUser.phoneNumber,mode: 'signup' } },)
        }
      },
    );

  }
  onSubmit(): void {
    let payload: SignUpUser = {
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      email: this.signupForm.get('email')?.value,
      phoneNumber: this.signupForm.get('mobileNumber')?.value,
      password: this.signupForm.get('password')?.value,
    }
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched()
      return
    }
    this.store.dispatch(signUp({ payload }))

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
