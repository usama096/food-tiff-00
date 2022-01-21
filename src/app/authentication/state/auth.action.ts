import { createAction, props } from "@ngrx/store";
import * as AuthModel from "./auth.model";

export enum AuthActionTypes {
  SIGNIN = '[SIGNIN]',
  SIGNIN_SUCCESS = '[SIGNIN] SUCCESS',
  SIGNIN_FAILURE = '[SIGNIN] FAILURE',

  SIGNUP = '[SIGNUP]',
  SIGNUP_SUCCESS = '[SIGNUP] SUCCESS',
  SIGNUP_FAILURE = '[SIGNUP] FAILURE',

  SIGNOUT = '[SIGNOUT]',
  SIGNOUT_SUCCESS = '[SIGNOUT] SUCCESS',
  SIGNOUT_FAILURE = '[SIGNOUT] FAILURE',

  FORGOT_PASSWORD = '[FORGOT_PASSWORD]',
  FORGOT_PASSWORD_SUCCESS = '[FORGOT_PASSWORD] SUCCESS',
  FORGOT_PASSWORD_FAILURE = '[FORGOT_PASSWORD] FAILURE',

  OTP = '[OTP]',
  OTP_SSUCCESS = '[OTP] SUCCESS',
  OTP_FAILURE = '[OTP] FAILURE',

  RESET_PASSWORD = '[RESET_PASSWORD]',
  RESET_PASSWORD_SUCCESS = '[RESET_PASSWORD] SUCCESS',
  RESET_PASSWORD_FAILURE = '[RESET_PASSWORD] FAILURE',


}
export const signIn = createAction(AuthActionTypes.SIGNIN,
  props<{ payload: AuthModel.SignIn }>(),
);
export const signInSuccess = createAction(AuthActionTypes.SIGNIN_SUCCESS,
  props<{ response: any }>()
);
export const signInFailure = createAction(AuthActionTypes.SIGNIN_FAILURE,
  props<{ error: any }>()
);
export const signUp = createAction(AuthActionTypes.SIGNUP,
  props<{ payload: AuthModel.SignUp }>(),
);
export const signUpSuccess = createAction(AuthActionTypes.SIGNUP_SUCCESS,
  props<{ response: any }>()
);
export const signUpFailure = createAction(AuthActionTypes.SIGNUP_FAILURE,
  props<{ error: any }>()
);

export const signOut = createAction(AuthActionTypes.SIGNOUT);
export const signOutSuccess = createAction(AuthActionTypes.SIGNOUT_SUCCESS,
);
export const signOutFailure = createAction(AuthActionTypes.SIGNOUT_SUCCESS,
  props<{ error: any }>()
);
export const otp = createAction(AuthActionTypes.OTP,
  props<{ payload: AuthModel.Otp }>()
  );
export const otpSuccess = createAction(AuthActionTypes.OTP_SSUCCESS,
  props<{ response: any }>()
);
export const otpFailure = createAction(AuthActionTypes.OTP_FAILURE,
  props<{ error: any }>()
);

export const forgotPassword = createAction(AuthActionTypes.FORGOT_PASSWORD,
  props<{ payload: AuthModel.Forgot }>()
  );
export const forgotPasswordSuccess = createAction(AuthActionTypes.FORGOT_PASSWORD_SUCCESS,
  props<{ response: any }>()
);
export const forgotPasswordFailure = createAction(AuthActionTypes.FORGOT_PASSWORD_FAILURE,
  props<{ error: any }>()
);

export const resetPassword = createAction(AuthActionTypes.RESET_PASSWORD,
  props<{ payload: AuthModel.Reset }>()
  );
export const resetPasswordSuccess = createAction(AuthActionTypes.RESET_PASSWORD_SUCCESS,
  props<{ response: any }>()
);
export const resetPasswordFailure = createAction(AuthActionTypes.RESET_PASSWORD_FAILURE,
  props<{ error: any }>()
);



