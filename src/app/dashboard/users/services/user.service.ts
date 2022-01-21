import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, } from 'rxjs/operators';
import { Users } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'dashboard/users';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl)
      .pipe(
        tap((data: any) => console.log(JSON.stringify(data))),
      );
  }

  getUser(id: number): Observable<Users> {
    if (!id) {
      return of(this.initializeUser());
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<Users>(url)
      .pipe(
        tap((data: any) => console.log('getUser: ' + JSON.stringify(data))),
      );
  }

  createUser(users: Users): Observable<Users> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Users>(this.usersUrl, users, { headers })
      .pipe(
        tap(data => console.log('User Created: ' + JSON.stringify(data))),
      );
  }

  deleteUser(id: number): Observable<Users> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<Users>(url, { headers })
      .pipe(
        tap(data => console.log("Deleted User Number: " + id)),
      );
  }
  updateUser(users: Users): Observable<Users> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.usersUrl}/${users.id}`;
    return this.http.put<Users>(url, users, { headers })
      .pipe(
        tap(() => console.log('updateUser: ' + users.id)),
        map(() => users),
      );
  }

  private initializeUser(): Users {
    return {
      id: null!,
      firstName: null!,
      lastName: null!,
      email: null!,
      mobileNumber: null!,
      isActive: null!,
      userType: null!,
      profileImgUrl: null!

    };
  }
}
