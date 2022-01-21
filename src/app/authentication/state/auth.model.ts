export interface SignIn {
  mobileNumber: string,
  password: string,
}
export interface SignUp {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  password: string,
  userType: string
}
export interface Otp {
  mobileNumber: string,
  otp: string,
  token?: string
}
export interface Forgot {
  mobileNumber: string
}
export interface Reset {
  password: string;
  token: string;
}
