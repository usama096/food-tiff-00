export interface SignIn {
  phoneNumber: string,
  password: string,
}
export interface SignUp {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
}
export interface Otp {
  phoneNumber: string,
  otp: string,
  token?: string
}
export interface Forgot {
  phoneNumber: string
}
export interface Reset {
  password: string;
  token: string;
}
