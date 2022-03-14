import { createAction, props } from '@ngrx/store';
import { Product } from '../models/products';
import * as ProductModel from './product.model';

export enum ProductActionTypes {
  GET_PRODUCTS = '[GET PRODUCTS]',
  GET_PRODUCTS_SUCCESS = '[GET_PRODUCTS] SUCCESS',
  GET_PRODUCTS_FAILURE = '[GET_PRODUCTS] FAILURE',

  GET_PRODUCT_BY_ID = '[GET PRODUCT BY ID]',
  GET_PRODUCT_BY_ID_SUCCESS = '[GET PRODUCT BY ID] SUCCESS',
  GET_PRODUCT_BY_ID_FAILURE = '[GET PRODUCT BY ID FAILURE]',

  UPDATE_PRODUCT = '[UPDATE PRODUCT]',
  UPDATE_PRODUCT_SUCCESS = '[UPDATE PRODUCT] SUCCESS',
  UPDATE_PRODUCT_FAILURE = '[UPDATE PRODUCT] FAILURE',

  DELETE_PRODUCT = '[DELETE PRODUCT]',
  DELETE_PRODUCT_SUCCESS = '[DELETE PRODUCT] SUCCESS',
  DELETE_PRODUCT_FAILURE = '[DELETE PRODUCT] FAILURE',

  ADD_PRODUCT = '[ADD PRODUCT]',
  ADD_PRODUCT_SUCCESS = '[ADD PRODUCT] SUCCESS',
  ADD_PRODUCT_FAILURE = '[ADD PRODUCT] FAILURE',
}

export const getProducts = createAction(ProductActionTypes.GET_PRODUCTS);

export const getProductsSuccess = createAction(
  ProductActionTypes.GET_PRODUCTS_SUCCESS,
  props<{ response: any }>()
);
export const getProductsFailure = createAction(
  ProductActionTypes.GET_PRODUCTS_FAILURE,
  props<{ error: any }>()
);
export const getProductById = createAction(
  ProductActionTypes.GET_PRODUCT_BY_ID,
  props<{ id: number }>()
);

export const getProductByIdSuccess = createAction(
  ProductActionTypes.GET_PRODUCT_BY_ID_SUCCESS,
  props<{ response: any }>()
);

export const getProductByIdFailure = createAction(
  ProductActionTypes.GET_PRODUCT_BY_ID_FAILURE,
  props<{ error: any }>()
);

export const updateProduct = createAction(
  ProductActionTypes.UPDATE_PRODUCT,
  props<{ product: Product,id: number }>()
);
export const updateProductSuccess = createAction(
  ProductActionTypes.UPDATE_PRODUCT_SUCCESS,
  props<{ response: any }>()
);
export const updateProductFailure = createAction(
  ProductActionTypes.UPDATE_PRODUCT_FAILURE,
  props<{ error: any }>()
);
export const deleteProduct = createAction(
  ProductActionTypes.DELETE_PRODUCT,
  props<{ id: any }>()
);
export const deleteProductSuccess = createAction(
  ProductActionTypes.DELETE_PRODUCT_SUCCESS,
  props<{ response: any }>()
);
export const deleteProductFailure = createAction(
  ProductActionTypes.DELETE_PRODUCT_FAILURE,
  props<{ error: any }>()
);
export const addProduct = createAction(
  ProductActionTypes.ADD_PRODUCT,
  props<{ product: ProductModel.Product }>()
);
export const addProductSuccess = createAction(
  ProductActionTypes.ADD_PRODUCT_SUCCESS,
  props<{ response: any }>()
);
export const addProductFailure = createAction(
  ProductActionTypes.ADD_PRODUCT_FAILURE,
  props<{ error: any }>()
);
