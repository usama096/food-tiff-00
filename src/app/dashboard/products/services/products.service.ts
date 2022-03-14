import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}`)
      .pipe(
        tap((data: any) => data),
      );
  }

  getProduct(id: number): Observable<Product> {
    if (!id) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap((data: any) => data),
      );
  }

  createProduct(product: Product): Observable<Product> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(`${this.productsUrl}`, product, { headers })
      .pipe(
        tap(data => data),
      );
  }

  deleteProduct(id: number): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log("Deleted Product Number: " + id)),
      );
  }
  updateProduct(products: Product, id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.patch<Product>(url, products)
      .pipe(
        tap(() => console.log('updateProduct: ',id)),
        map(() => products),
      );
  };
  availableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/available`)
      .pipe(
        tap((data: any) => data),
      );
  }

  searchProductsby(category?: string, type?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (category) {
      params = params.append("category", category)
    }
    if (type) {
      params = params.append("prodType", type)
    }
    return this.http.get<Product[]>(`${this.productsUrl}/searchby`, { params: params })
      .pipe(
        tap((data: any) => data),
      );
  }

  private initializeProduct(): Product {
    return {
      id: null!,
      name: null!,
      description: null!,
      imageId: null!,
      price: null!,
      shortDescription: null!,
      prodType: null!,
      category: null!,
      ingredients: null!,
      allergyInfo: null!,
      calories: null!,
      weight: null!,
      sku: null!,
      isAvailable: null!,
      image:null!,

    };
  }
}
