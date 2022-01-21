import * as ProductModel from './product.model';
import { createReducer, on } from '@ngrx/store';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  getProducts,
  getProductById,
  getProductByIdFailure,
  getProductByIdSuccess,
  getProductsFailure,
  getProductsSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
} from './product.action';

export interface ProductState {
  products: ProductModel.Product[] | null;
  product: ProductModel.Product | null;
  id: number | null;
  errorMesage: string | null;
  response: any;
}
export const initialState: ProductState = {
  products: null,
  product:null,
  id: null,
  errorMesage: null,
  response: null,
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(getProducts, (state): ProductState => {
    return {
      ...state,
    };
  }),
  on(getProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.response,
    };
  }),
  on(getProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
      products: null
    };
  }),
  on(getProductById, (state): ProductState => {
    return {
      ...state,
      id: state.id,
    };
  }),
  on(getProductByIdSuccess, (state, action): ProductState => {
    return {
      ...state,
      product: action.response,
    };
  }),
  on(getProductByIdFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
      product: null
    };
  }),
  on(updateProduct, (state): ProductState => {
    return {
      ...state,
      id: state.id,
    };
  }),

  on(updateProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      product: action.response,
    };
  }),
  on(updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(deleteProduct, (state): ProductState => {
    return {
      ...state,
    };
  }),

  on(deleteProductSuccess, (state): ProductState => {
    return {
      ...state,
      id: state.id,
      response: state.response,
    };
  }),
  on(deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  }),
  on(addProduct, (state): ProductState => {
    return {
      ...state,
    };
  }),

  on(addProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      product: action.response,
    };
  }),
  on(addProductFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
    };
  })
);
