import * as PlanModel from './plan.model';
import { createReducer, on } from '@ngrx/store';
import {
  addPlan,
  addPlanFailure,
  addPlanSuccess,
  deletePlan,
  deletePlanFailure,
  deletePlanSuccess,
  getPlans,
  getPlansById,
  getPlansByIdFailure,
  getPlansByIdSuccess,
  getPlansFailure,
  getPlansSuccess,
  updatePlan,
  updatePlanFailure,
  updatePlanSuccess,
} from './plan.action';

export interface PlanState {
  plans: PlanModel.Plan[] | null;
  plan: PlanModel.Plan | null;
  id: number | null;
  errorMesage: string | null;
  response: any;
}
export const initialState: PlanState = {
  plans: null,
  id: null,
  errorMesage: null,
  response: null,
  plan: null,
};

export const planReducer = createReducer<PlanState>(
  initialState,
  on(getPlans, (state): PlanState => {
    return {
      ...state,
    };
  }),
  on(getPlansSuccess, (state, action): PlanState => {
    return {
      ...state,
      plans: action.response,
    };
  }),
  on(getPlansFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
      plans: null,
    };
  }),
  on(getPlansById, (state): PlanState => {
    return {
      ...state,
      id: state.id,
    };
  }),
  on(getPlansByIdSuccess, (state, action): PlanState => {
    return {
      ...state,
      plan: action.response,
    };
  }),
  on(getPlansByIdFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(updatePlan, (state): PlanState => {
    return {
      ...state,
      id: state.id,
    };
  }),

  on(updatePlanSuccess, (state, action): PlanState => {
    return {
      ...state,
      plan: action.response,
    };
  }),
  on(updatePlanFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(deletePlan, (state): PlanState => {
    return {
      ...state,
      id: state.id,
    };
  }),

  on(deletePlanSuccess, (state, action): PlanState => {
    return {
      ...state,
      response: action.response,
    };
  }),
  on(deletePlanFailure, (state, action): PlanState => {
    return {
      ...state,
      response: action.error,
    };
  }),
  on(addPlan, (state): PlanState => {
    return {
      ...state,
    };
  }),

  on(addPlanSuccess, (state, action): PlanState => {
    return {
      ...state,
      plan: action.response,
    };
  }),
  on(addPlanFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  })
);
