import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as AuthAction from './auth.action'
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAction.signIn),
      concatMap((action) => {
        return this.authService.signInUser(action.payload.mobileNumber, action.payload.password).pipe(
          map((response) => {
            return AuthAction.signInSuccess({ response });
          }),
          catchError((error) => {
            return of(AuthAction.signInFailure({ error }))
          }
          )
        );
      })
    )
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAction.signUp),
      concatMap((action) => {
        return this.authService.signUpUser(action.payload).pipe(
          map((response) => {
            return AuthAction.signUpSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(AuthAction.signUpFailure({ error }))
          })
        )
      })
    )
  });
  otp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAction.otp),
      concatMap((action) => {
        return this.authService.otp(action.payload.otp, action.payload.mobileNumber).pipe(
          map((response: any) => {
            return AuthAction.otpSuccess({ response })
          }),
          catchError((error) => {
            return of(AuthAction.otpFailure({ error }))
          })
        )
      })
    )
  });

  forgot$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAction.forgotPassword),
      concatMap((action) => {
        return this.authService.forgotPassword(action.payload).pipe(
          map((response) => {
            return AuthAction.forgotPasswordSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(AuthAction.forgotPasswordFailure({ error }))
          })
        )
      })
    )
  });

  reset$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAction.resetPassword),
      concatMap((action) => {
        return this.authService.resetPassword(action.payload.password,action.payload.token).pipe(
          map((response) => {
            debugger
            return AuthAction.resetPasswordSuccess({ response })
          }),
          catchError((error) => {
            debugger
            console.log(error)
            return of(AuthAction.resetPasswordFailure({ error }))
          })
        )
      })
    )
  });


}
