import { createReducer, on } from '@ngrx/store';
import {
  addPlan,
  addPlanFailure,
  addPlanpProducts,
  addPlanpProductsFailure,
  addPlanpProductsSuccess,
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
import { PlanProducts } from '../models/plan-products-model';
import { Plan } from './plan.model';

export interface PlanState {
  plans: Plan[] | null;
  plan: Plan | null;
  id: number | null;
  errorMesage: string | null;
  response: any;
  addSuccess: boolean | null;
  updateSuccess: boolean | null;
  planProducts: PlanProducts[] | null

}
export const initialState: PlanState = {
  plans: null,
  id: null,
  errorMesage: null,
  response: null,
  plan: null,
  addSuccess: null,
  updateSuccess: null,
  planProducts: null,
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
      plan: null,
      id: null,
      addSuccess: null,
      updateSuccess: null,
    };
  }),
  on(getPlansFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
      plans: null,
    };
  }),
  on(getPlansById, (state, action): PlanState => {
    return {
      ...state,
      id: action.id,
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
  on(updatePlan, (state, action): PlanState => {
    return {
      ...state,
    };
  }),

  on(updatePlanSuccess, (state, action): PlanState => {
    return {
      ...state,
      response: action.response,
      updateSuccess: true,
    };
  }),
  on(updatePlanFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
      updateSuccess: false,
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
      addSuccess: true,

    };
  }),
  on(addPlanFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
      updateSuccess: false,
    };
  }),
  on(addPlanpProducts, (state): PlanState => {
    return {
      ...state,
    };
  }),

  on(addPlanpProductsSuccess, (state, action): PlanState => {
    return {
      ...state,
      planProducts: action.response,
    };
  }),
  on(addPlanpProductsFailure, (state, action): PlanState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  })

);
