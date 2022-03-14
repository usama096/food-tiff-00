import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAction from './user.action'
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from '../services/user.service';
@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private router: Router,
  ) { }

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.getUsers),
      concatMap((action) => {
        return this.userService.getUsers().pipe(
          map((response) => {
            return UserAction.getUsersSuccess({ response });
          }),
          catchError((error) => {
            return of(UserAction.getUsersFailure({ error }))
          }
          )
        );
      })
    )
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.getUsersById),
      concatMap((action) => {
        return this.userService.getUser(action.id).pipe(
          map((response) => {
            return UserAction.getUsersByIdSuccess({ response })
          }),
          catchError((error) => {
            return of(UserAction.getUsersFailure({ error }))
          })
        )
      })
    )
  });
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.updateUser),
      concatMap((action) => {
        return this.userService.updateUser(action.user, action.id).pipe(
          map((response: any) => {
            return UserAction.updateUserSuccess({ response })
          }),
          catchError((error) => {
            return of(UserAction.updateUserFailure({ error }))
          })
        )
      })
    )
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.deleteUser),
      concatMap((action) => {
        debugger
        return this.userService.deleteUser(action.id).pipe(
          map((response) => {
            return UserAction.deleteUserSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(UserAction.deleteUserFailure({ error }))
          })
        )
      })
    )
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.addUser),
      concatMap((action) => {
        return this.userService.createUser(action.user).pipe(
          map((response) => {
            return UserAction.addUserSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(UserAction.addUserFailure({ error }))
          })
        )
      })
    )
  });


}
