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
import { Product } from '../models/products';

export interface ProductState {
  products: Product[] | null;
  product: Product | null;
  id: number | null;
  errorMesage: string | null;
  response: any;
  addSuccess: boolean | null;
  updateSuccess: boolean | null;

}
export const initialState: ProductState = {
  products: null,
  product: null,
  id: null,
  errorMesage: null,
  response: null,
  addSuccess: null,
  updateSuccess: null,
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(getProducts, (state): ProductState => {
    return {
      ...state,
      addSuccess: null,
      updateSuccess: null,
      id: null,
      product: null
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
      products: null,
    };
  }),
  on(getProductById, (state, action): ProductState => {
    return {
      ...state,
      id: action.id,
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
      product: null,

    };
  }),
  on(updateProduct, (state, action): ProductState => {
    return {
      ...state,
      product: action.product,
      id: action.id
    };
  }),

  on(updateProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      product: action.response,
      id: state.id,
      updateSuccess: true,

    };
  }),
  on(updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
      updateSuccess: false,

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
      addSuccess: true,
    };
  }),
  on(addProductFailure, (state, action): ProductState => {
    return {
      ...state,
      errorMesage: action.error,
      addSuccess: false,
    };
  })
);
