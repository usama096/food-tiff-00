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
    return this.http.post<SignUpUser>(`${this.url}/auth/register`, user)
  }
  signInUser(phoneNumber: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/login`, { phoneNumber, password })
  }
  getUser(id: number) {
    const url = `${this.url}/users/${id}`;
    return this.http.get(url)
      .pipe(
        tap((data: any) => data)
      )
  }
  forgotPassword(val: any): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/forgot-password`, val)
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
