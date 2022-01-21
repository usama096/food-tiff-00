import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersUrl = 'dashboard/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.ordersUrl)
      .pipe(
        tap((data: any) => console.log(JSON.stringify(data))),
      );
  }

  getOrder(orderId: number): Observable<Orders> {
    if (!orderId) {
      return of(this.initializeOrder());
    }
    const url = `${this.ordersUrl}/${orderId}`;
    return this.http.get<Orders>(url)
      .pipe(
        tap((data: any) => console.log('getOrder: ' + JSON.stringify(data))),
      );
  }

  createOrder(orders: Orders): Observable<Orders> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Orders>(this.ordersUrl, orders, { headers })
      .pipe(
        tap(data => console.log('Order Created: ' + JSON.stringify(data))),
      );
  }

  deleteOrder(orderId: number): Observable<Orders> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.ordersUrl}/${orderId}`;
    return this.http.delete<Orders>(url, { headers })
      .pipe(
        tap(data => console.log("Deleted Order Number: " + orderId)),
      );
  }
  updateOrder(orders: Orders): Observable<Orders> {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.ordersUrl}/${orders.orderId}`;
    return this.http.put<Orders>(url, orders, { headers })
      .pipe(
        tap(() => console.log('updateOrder: ' + orders.orderId)),
        map(() => orders),
      );
  }
  private initializeOrder(): Orders {
    return {
      orderId: null!,
      customerName: null!,
      order: null!,
      deliveryDate: null!,
      price: null!,
      deliveryStatus: null!,
      paymentMethod: null!,
      action: null!,
      image: null!
    };
  }
}
