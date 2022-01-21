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
                const message = `Product id was not a number: ${id}`;
                console.error(message);
                return of({ users: null, error: message })
            }
            return this.userService.getUser(+id)
                .pipe(
                    map(product => ({ users: product })),
                    catchError(error => {
                        const message = `Retrivel error: ${error}`;
                        console.error(message);
                        return of({ users: null, error: message })
                    })
                )
        }
        else {
            const message = `id is null`;
            console.error(message);
            return of({ users: null, error: message })
        }
    }

}


