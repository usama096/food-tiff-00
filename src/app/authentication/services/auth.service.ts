import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpUser } from '../models/auth-model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  signUpUser(user: SignUpUser) {
    return this.http.post<SignUpUser>(`${this.url}/auth/signup/NF124`, user)
  }
  signInUser(mobileNumber: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/signin`, { mobileNumber, password })
  }
  getUser() {
    const url = `${this.url}/user/getUser`;
    return this.http.get(url)
      .pipe(
        tap((data: any) => data)
      )
  }
  forgotPassword(val: any): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/forgot-password-mobile`, val)
  }
  otp(otp: string, mobileNumber: string): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/verify-otp`, { otp, mobileNumber })
  }
  resetPassword(password: string, token: string): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/reset-password`, { password, token })
  }
  isUserLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
  }
  signOut() {
    return localStorage.removeItem('accessToken')
  }
}
