import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
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
      private spinerService: SpinnerService,
      private store: Store
    ) {

    this.signinForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.store.select((state: any) => state.auth).subscribe(
      (res: any) => {
        if (!res) {
          return;
        }
        console.log(res)
        if (res.token) {
          localStorage.setItem('accessToken', res.token);
          this.router.navigate(['/dashboard'])
          this.spinerService.spinnerHide()
        }
        if(res.errorMessage){
          this.spinerService.spinnerHide();
        }
      },
    );

  }

  onSubmit(): void {
    if (!this.signinForm.valid) {
      this.signinForm.markAllAsTouched();
      return
    }
    const payload: SignIn = {
      phoneNumber: this.signinForm.get('phoneNumber')?.value,
      password: this.signinForm.get('password')?.value,
    };

    this.spinerService.spinnerShow()
    this.store.dispatch(signIn({ payload }));
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.signinForm.controls[controlName]
    if (!control)
      return false;
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}

