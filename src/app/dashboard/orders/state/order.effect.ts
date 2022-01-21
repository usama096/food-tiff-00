import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersService } from '../services/orders.service';
import * as OrderAction from './order.action'
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class OrderEffects {

  constructor(
    private actions$: Actions,
    private plansService: OrdersService,
    private router: Router,
  ) { }

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderAction.getOrders),
      concatMap((action) => {
        return this.plansService.getOrders().pipe(
          map((response) => {
            return OrderAction.getOrdersSuccess({ response });
          }),
          catchError((error) => {
            return of(OrderAction.getOrdersFailure({ error }))
          }
          )
        );
      })
    )
  });

  getOrderById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderAction.getOrdersById),
      concatMap((action) => {
        return this.plansService.getOrder(action.id).pipe(
          map((response) => {
            return OrderAction.getOrdersByIdSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(OrderAction.getOrdersFailure({ error }))
          })
        )
      })
    )
  });
  updateOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderAction.updateOrder),
      concatMap((action) => {
        return this.plansService.updateOrder(action.product).pipe(
          map((response: any) => {
            return OrderAction.updateOrderSuccess({ response })
          }),
          catchError((error) => {
            return of(OrderAction.updateOrderFailure({ error }))
          })
        )
      })
    )
  });

  deleteOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderAction.deleteOrder),
      concatMap((action) => {
        return this.plansService.deleteOrder(action.id).pipe(
          map((response) => {
            return OrderAction.deleteOrderSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(OrderAction.deleteOrderFailure({ error }))
          })
        )
      })
    )
  });

  addOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderAction.addOrder),
      concatMap((action) => {
        return this.plansService.createOrder(action.product).pipe(
          map((response) => {
            debugger
            return OrderAction.addOrderSuccess({ response })
          }),
          catchError((error) => {
            debugger
            console.log(error)
            return of(OrderAction.addOrderFailure({ error }))
          })
        )
      })
    )
  });


}
