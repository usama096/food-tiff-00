import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/users-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
   }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  getUser(id: number): Observable<User> {
    if (!id) {
      return of(this.initializeUser());
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user)
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url)
  }
  updateUser(user: User, id: number): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.patch<User>(url, user)
      .pipe(
        tap(() => console.log('updateUser: ' + user.id)),
        map(() => user),
      );
  }
  searchUserBy(userType?: string, propertyName?: string, value?: string, activeOnly?: boolean): Observable<User> {
    let params = new HttpParams();
    params = params.append('userType', userType!);
    params = params.append('propertyName', propertyName!);
    params = params.append('value', value!);
    params = params.append('activeOnly', activeOnly!);
    return this.http.get<User>(`${this.usersUrl}/searchBy`, { params });
  }

  private initializeUser(): User {
    return {
      id: null!,
      firstName: null!,
      lastName: null!,
      email: null!,
      mobileNumber: null!,
      isActive: null!,
      userType: null!,
      image: null!
    };
  }
}
