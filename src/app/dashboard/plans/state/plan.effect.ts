import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlansService } from '../services/plans.service';
import * as PlanAction from './plan.action'
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class PlanEffects {

  constructor(
    private actions$: Actions,
    private plansService: PlansService,
    private router: Router,
  ) { }

  getPlans$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanAction.getPlans),
      concatMap((action) => {
        return this.plansService.getPlans().pipe(
          map((response) => {
            return PlanAction.getPlansSuccess({ response });
          }),
          catchError((error) => {
            return of(PlanAction.getPlansFailure({ error }))
          }
          )
        );
      })
    )
  });

  getPlanById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanAction.getPlansById),
      concatMap((action) => {
        return this.plansService.getPlan(action.id).pipe(
          map((response) => {
            return PlanAction.getPlansByIdSuccess({ response })
          }),
          catchError((error) => {
            return of(PlanAction.getPlansFailure({ error }))
          })
        )
      })
    )
  });
  updatePlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanAction.updatePlan),
      concatMap((action) => {
        return this.plansService.updatePlan(action.plan).pipe(
          map((response: any) => {
            return PlanAction.updatePlanSuccess({ response })
          }),
          catchError((error) => {
            return of(PlanAction.updatePlanFailure({ error }))
          })
        )
      })
    )
  });

  deletePlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanAction.deletePlan),
      concatMap((action) => {
        return this.plansService.deletePlan(action.id).pipe(
          map((response) => {
            return PlanAction.deletePlanSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(PlanAction.deletePlanFailure({ error }))
          })
        )
      })
    )
  });

  addPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanAction.addPlan),
      concatMap((action) => {
        return this.plansService.createPlan(action.plan).pipe(
          map((response) => {
            return PlanAction.addPlanSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(PlanAction.addPlanFailure({ error }))
          })
        )
      })
    )
  });


}
