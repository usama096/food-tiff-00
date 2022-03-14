import * as AuthModel from "./auth.model";
import { createReducer, on } from "@ngrx/store";
import { forgotPassword, forgotPasswordFailure, forgotPasswordSuccess, otp, otpFailure, otpSuccess, resetPassword, resetPasswordFailure, resetPasswordSuccess, signIn, signInFailure, signInSuccess, signOut, signOutFailure, signOutSuccess, signUp, signUpFailure, signUpSuccess } from "./auth.action";

export interface AuthState {
  isAuthenticated: boolean;
  signInUser: AuthModel.SignIn | null;
  signUpUser: AuthModel.SignUp | null,
  errorMessage: string | null;
  authResponse: any;
  token: string | null;
  otp: AuthModel.Otp | null;
  forgot: AuthModel.Forgot |null;
  reset: AuthModel.Reset | null;
  signupSuccess: boolean | null;


}
export const initialState: AuthState = {
  isAuthenticated: false,
  signInUser: null,
  errorMessage: null,
  signUpUser: null,
  authResponse: null,
  token: null,
  otp: null,
  forgot: null,
  reset: null,
  signupSuccess: null,


}
export const authReducer = createReducer<AuthState>(
  initialState,
  on(signIn, (state): AuthState => {
    return {
      ...state,
    }
  }),
  on(signInSuccess, (state, action): AuthState => {
    return {
      ...state,
      isAuthenticated: true,
      signInUser: action.response,
      token: action.response.accessToken,
    }
  }),
  on(signInFailure, (state, action): AuthState => {
    return {
      ...state,
      isAuthenticated: false,
      authResponse: action.error,
      token: null,
      errorMessage: action.error
    }
  }),
  on(signUp, (state): AuthState => {
    return {
      ...state
    }
  }),
  on(signUpSuccess, (state, action): AuthState => {
    return {
      ...state,
      signUpUser: action.response,
      signupSuccess: true,
    }
  }),
  on(signUpFailure, (state, action): AuthState => {
    return {
      ...state,
      errorMessage: action.error,
      signupSuccess: false,

    }
  }),
  on(signOut, (state): AuthState => {
    return {
      ...state,
      token: null
    }
  }),

  on(otp, (state): AuthState => {
    return {
      ...state
    }
  }),
  on(otpSuccess, (state, action): AuthState => {
    return {
      ...state,
      otp: action.response
    }
  }),
  on(otpFailure, (state, action): AuthState => {
    return {
      ...state,
      errorMessage: action.error
    }
  }),

  on(forgotPassword, (state): AuthState => {
    return {
      ...state
    }
  }),
  on(forgotPasswordSuccess, (state, action): AuthState => {
    return {
      ...state,
      forgot: action.response
    }
  }),
  on(forgotPasswordFailure, (state, action): AuthState => {
    return {
      ...state,
      errorMessage: action.error
    }
  }),

  on(resetPassword, (state): AuthState => {
    return {
      ...state
    }
  }),
  on(resetPasswordSuccess, (state, action): AuthState => {
    debugger
    return {
      ...state,
      reset: action.response
    }
  }),
  on(resetPasswordFailure, (state, action): AuthState => {
    debugger
    return {
      ...state,
      errorMessage: action.error
    }
  }),

)
