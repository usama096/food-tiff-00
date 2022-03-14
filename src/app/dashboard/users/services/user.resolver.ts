import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersResolved } from '../models/users-model';
import { UsersService } from './user.service';
@Injectable({
    providedIn: 'root'
})

export class UserResolver implements Resolve<UsersResolved>{

    constructor(private userService: UsersService) { };

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UsersResolved> {
        const id = route.paramMap.get('id')
        if (id) {
            if (isNaN(+id!)) {
                return of({ user: null })
            }
            return this.userService.getUser(+id)
                .pipe(
                    map(product => ({ user: product })),
                    catchError(error => {
                        const message = `Retrivel error: ${error}`;
                        return of({ user: null, error: message })
                    })
                )
        }
        else {
            return of({ user: null})
        }
    }

}


