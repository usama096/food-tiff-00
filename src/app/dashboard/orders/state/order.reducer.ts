import * as OrderModel from './order.model';
import { createReducer, on } from '@ngrx/store';
import {
  addOrder,
  addOrderFailure,
  addOrderSuccess,
  deleteOrder,
  deleteOrderFailure,
  deleteOrderSuccess,
  getOrders,
  getOrdersById,
  getOrdersByIdFailure,
  getOrdersByIdSuccess,
  getOrdersFailure,
  getOrdersSuccess,
  updateOrder,
  updateOrderFailure,
  updateOrderSuccess,
} from './order.action';

export interface OrderState {
  plans: OrderModel.Order | null;
  id: number | null;
  errorMesage: string | null;
  response: any;
}
export const initialState: OrderState = {
  plans: null,
  id: null,
  errorMesage: null,
  response: null,
};

export const orderReducer = createReducer<OrderState>(
  initialState,
  on(getOrders, (state): OrderState => {
    return {
      ...state,
    };
  }),
  on(getOrdersSuccess, (state, action): OrderState => {
    return {
      ...state,
      response: action.response,
    };
  }),
  on(getOrdersFailure, (state, action): OrderState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(getOrdersById, (state): OrderState => {
    return {
      ...state,
      id: state.id,
    };
  }),
  on(getOrdersByIdSuccess, (state, action): OrderState => {
    return {
      ...state,
      id: action.response,
    };
  }),
  on(getOrdersByIdFailure, (state, action): OrderState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(updateOrder, (state): OrderState => {
    return {
      ...state,
      id: state.id,
    };
  }),

  on(updateOrderSuccess, (state, action): OrderState => {
    return {
      ...state,
      response: action.response,
    };
  }),
  on(updateOrderFailure, (state, action): OrderState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(deleteOrder, (state): OrderState => {
    return {
      ...state,
      id: state.id,
    };
  }),

  on(deleteOrderSuccess, (state, action): OrderState => {
    return {
      ...state,
      response: action.response,
    };
  }),
  on(deleteOrderFailure, (state, action): OrderState => {
    return {
      ...state,
      response: action.error,
    };
  }),
  on(addOrder, (state): OrderState => {
    return {
      ...state,
    };
  }),

  on(addOrderSuccess, (state, action): OrderState => {
    return {
      ...state,
      response: action.response,
    };
  }),
  on(addOrderFailure, (state, action): OrderState => {
    debugger;
    return {
      ...state,
      errorMesage: action.error,
    };
  })
);
