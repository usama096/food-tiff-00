import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.moddule';
import { ResetComponent } from './reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MaterialModule } from '../material/material.module';
import { VerificationComponent } from './verification/verification.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SavedComponent } from './saved/saved.component';
@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    AuthenticationComponent,
    ResetComponent,
    ForgotComponent,
    VerificationComponent,
    SavedComponent,

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule,
    NgOtpInputModule,
    HttpClientModule
  ],
  exports: [
    SigninComponent,
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
