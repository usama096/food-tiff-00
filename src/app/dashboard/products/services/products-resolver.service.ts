import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductsResolved } from '../models/products'
import { ProductsService } from './products.service';
@Injectable({
    providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductsResolved>{

    constructor(private productsService: ProductsService) { };

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductsResolved> {
        const id = route.paramMap.get('id')
        if (id) {
            if (isNaN(+id!)) {
                const message = `Product id was not a number: ${id}`;
                console.error(message);
                return of({ products: null, error: message })
            }
            return this.productsService.getProduct(+id)
                .pipe(
                    map(product => ({ products: product })),
                    catchError(error => {
                        const message = `Retrivel error: ${error}`;
                        console.error(message);
                        return of({ products: null, error: message })
                    })
                )
        }
        else {
            const message = `id is null`;
            console.error(message);
            return of({ products: null, error: message })
        }
    }

}


