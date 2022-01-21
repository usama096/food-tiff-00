import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, } from 'rxjs/operators';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'dashboard/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl)
      .pipe(
        tap((data: any) => data),
      );
  }

  getProduct(id: number): Observable<Products> {
    if (!id) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Products>(url)
      .pipe(
        tap((data: any) => console.log('getProduct: ' + JSON.stringify(data))),
      );
  }

  createProduct(products: Products): Observable<Products> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Products>(this.productsUrl, products, { headers })
      .pipe(
        tap(data => console.log('Product Created: ' + JSON.stringify(data))),
      );
  }

  deleteProduct(id: number): Observable<Products> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Products>(url, { headers })
      .pipe(
        tap(data => console.log("Deleted Product Number: " + id)),
      );
  }
  updateProduct(products: Products): Observable<Products> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${products.id}`;
    return this.http.put<Products>(url, products, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + products.id)),
        map(() => products),
      );
  }



  private initializeProduct(): Products {
    return {
      id: null!,
      name: null!,
      description: null!,
      image: null!,
      price: null!,
      shortDesc: null!,
      productType: null!,
      category: null!,
      ingrediants: null!,
      allergyInfo: null!,
      calories: null!,
      weight: null!
    };
  }
}
