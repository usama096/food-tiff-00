import { createAction, props } from '@ngrx/store';
import * as OrderModel from './order.model';

export enum OrderActionTypes {
  GET_ORDERS = '[GET ORDERS]',
  GET_ORDERS_SUCCESS = '[GET ORDERS] SUCCESS',
  GET_ORDERS_FAILURE = '[GET ORDERS] FAILURE',

  GET_ORDER_BY_ID = '[GET ORDER BY ID]',
  GET_ORDER_BY_ID_SUCCESS = '[GET ORDER BY ID] SUCCESS',
  GET_ORDER_BY_ID_FAILURE = '[GET ORDER BY ID] SUCCESS',

  UPDATE_ORDER = '[UPDATE ORDER]',
  UPDATE_ORDER_SUCCESS = '[UPDATE ORDER] SUCCESS',
  UPDATE_ORDER_FAILURE = '[UPDATE ORDER] FAILURE',

  DELETE_ORDER = '[DELETE ORDER]',
  DELETE_ORDER_SUCCESS = '[DELETE ORDER] SUCCESS',
  DELETE_ORDER_FAILURE = '[DELETE ORDER] FAILURE',

  ADD_ORDER = '[ADD ORDER]',
  ADD_ORDER_SUCCESS = '[ADD ORDER] SUCCESS',
  ADD_ORDER_FAILURE = '[ADD ORDER] FAILURE',
}

export const getOrders = createAction(OrderActionTypes.GET_ORDERS);

export const getOrdersSuccess = createAction(
  OrderActionTypes.GET_ORDERS_SUCCESS,
  props<{ response: any }>()
);
export const getOrdersFailure = createAction(
  OrderActionTypes.GET_ORDERS_FAILURE,
  props<{ error: any }>()
);
export const getOrdersById = createAction(
  OrderActionTypes.GET_ORDER_BY_ID,
  props<{ id: number }>()
);

export const getOrdersByIdSuccess = createAction(
  OrderActionTypes.GET_ORDER_BY_ID_SUCCESS,
  props<{ response: any }>()
);

export const getOrdersByIdFailure = createAction(
  OrderActionTypes.GET_ORDER_BY_ID_FAILURE,
  props<{ error: any }>()
);

export const updateOrder = createAction(
  OrderActionTypes.UPDATE_ORDER,
  props<{ product: OrderModel.Order}>()
);
export const updateOrderSuccess = createAction(
  OrderActionTypes.UPDATE_ORDER_SUCCESS,
  props<{ response: any }>()
);
export const updateOrderFailure = createAction(
  OrderActionTypes.UPDATE_ORDER_FAILURE,
  props<{ error: any }>()
);
export const deleteOrder = createAction(
  OrderActionTypes.DELETE_ORDER,
  props<{ id: number }>()
);
export const deleteOrderSuccess = createAction(
  OrderActionTypes.DELETE_ORDER_SUCCESS,
  props<{ response: any }>()
);
export const deleteOrderFailure = createAction(
  OrderActionTypes.DELETE_ORDER_FAILURE,
  props<{ error: any }>()
);
export const addOrder = createAction(
  OrderActionTypes.ADD_ORDER,
  props<{ product: OrderModel.Order }>()
);
export const addOrderSuccess = createAction(
  OrderActionTypes.ADD_ORDER_SUCCESS,
  props<{ response: any }>()
);
export const addOrderFailure = createAction(
  OrderActionTypes.ADD_ORDER_FAILURE,
  props<{ error: any }>()
);
