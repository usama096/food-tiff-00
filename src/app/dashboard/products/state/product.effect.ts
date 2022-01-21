import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../services/products.service';
import * as ProductAction from './product.action'
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAction.getProducts),
      concatMap((action) => {
        return this.productsService.getProducts().pipe(
          map((response) => {
            return ProductAction.getProductsSuccess({ response });
          }),
          catchError((error) => {
            return of(ProductAction.getProductsFailure({ error }))
          }
          )
        );
      })
    )
  });

  getProductById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAction.getProductById),
      concatMap((action) => {
        return this.productsService.getProduct(action.id).pipe(
          map((response) => {
            return ProductAction.getProductByIdSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(ProductAction.getProductByIdFailure({ error }))
          })
        )
      })
    )
  });
  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAction.updateProduct),
      concatMap((action) => {
        return this.productsService.updateProduct(action.product).pipe(
          map((response: any) => {
            return ProductAction.updateProductSuccess({ response })
          }),
          catchError((error) => {
            return of(ProductAction.updateProductFailure({ error }))
          })
        )
      })
    )
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAction.deleteProduct),
      concatMap((action) => {
        return this.productsService.deleteProduct(action.id).pipe(
          map((response) => {
            return ProductAction.deleteProductSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(ProductAction.deleteProductFailure({ error }))
          })
        )
      })
    )
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAction.addProduct),
      concatMap((action) => {
        return this.productsService.createProduct(action.product).pipe(
          map((response) => {
            return ProductAction.addProductSuccess({ response })
          }),
          catchError((error) => {
            console.log(error)
            return of(ProductAction.addProductFailure({ error }))
          })
        )
      })
    )
  });


}
