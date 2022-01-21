import { createAction, props } from '@ngrx/store';
import * as PlanModel from './plan.model';

export enum PlanActionTypes {
  GET_PLANS = '[GET PLANS]',
  GET_PLANS_SUCCESS = '[GET PLANS] SUCCESS',
  GET_PLANS_FAILURE = '[GET PLANS] FAILURE',

  GET_PLAN_BY_ID = '[GET PLAN BY ID]',
  GET_PLAN_BY_ID_SUCCESS = '[GET PLAN BY ID] SUCCESS',
  GET_PLAN_BY_ID_FAILURE = '[GET PLAN BY ID] SUCCESS',

  UPDATE_PLAN = '[UPDATE PLAN]',
  UPDATE_PLAN_SUCCESS = '[UPDATE PLAN] SUCCESS',
  UPDATE_PLAN_FAILURE = '[UPDATE PLAN] FAILURE',

  DELETE_PLAN = '[DELETE PLAN]',
  DELETE_PLAN_SUCCESS = '[DELETE PLAN] SUCCESS',
  DELETE_PLAN_FAILURE = '[DELETE PLAN] FAILURE',

  ADD_PLAN = '[ADD PLAN]',
  ADD_PLAN_SUCCESS = '[ADD PLAN] SUCCESS',
  ADD_PLAN_FAILURE = '[ADD PLAN] FAILURE',
}

export const getPlans = createAction(PlanActionTypes.GET_PLANS);

export const getPlansSuccess = createAction(
  PlanActionTypes.GET_PLANS_SUCCESS,
  props<{ response: any }>()
);
export const getPlansFailure = createAction(
  PlanActionTypes.GET_PLANS_FAILURE,
  props<{ error: any }>()
);
export const getPlansById = createAction(
  PlanActionTypes.GET_PLAN_BY_ID,
  props<{ id: number }>()
);

export const getPlansByIdSuccess = createAction(
  PlanActionTypes.GET_PLAN_BY_ID_SUCCESS,
  props<{ response: any }>()
);

export const getPlansByIdFailure = createAction(
  PlanActionTypes.GET_PLAN_BY_ID_FAILURE,
  props<{ error: any }>()
);

export const updatePlan = createAction(
  PlanActionTypes.UPDATE_PLAN,
  props<{ plan: PlanModel.Plan}>()
);
export const updatePlanSuccess = createAction(
  PlanActionTypes.UPDATE_PLAN_SUCCESS,
  props<{ response: any }>()
);
export const updatePlanFailure = createAction(
  PlanActionTypes.UPDATE_PLAN_FAILURE,
  props<{ error: any }>()
);
export const deletePlan = createAction(
  PlanActionTypes.DELETE_PLAN,
  props<{ id: number }>()
);
export const deletePlanSuccess = createAction(
  PlanActionTypes.DELETE_PLAN_SUCCESS,
  props<{ response: any }>()
);
export const deletePlanFailure = createAction(
  PlanActionTypes.DELETE_PLAN_FAILURE,
  props<{ error: any }>()
);
export const addPlan = createAction(
  PlanActionTypes.ADD_PLAN,
  props<{ plan: PlanModel.Plan }>()
);
export const addPlanSuccess = createAction(
  PlanActionTypes.ADD_PLAN_SUCCESS,
  props<{ response: any }>()
);
export const addPlanFailure = createAction(
  PlanActionTypes.ADD_PLAN_FAILURE,
  props<{ error: any }>()
);
