import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, } from 'rxjs/operators';
import { Plans } from '../models/plans-model';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plansUrl = 'dashboard/plans';

  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plans[]> {
    return this.http.get<Plans[]>(this.plansUrl)
      .pipe(
        tap((data: any) => data),
      );
  }

  getPlan(id: number): Observable<Plans> {
    if (!id) {
      return of(this.initializePlan());
    }
    const url = `${this.plansUrl}/${id}`;
    return this.http.get<Plans>(url)
      .pipe(
        tap((data: any) => data),
      );
  }

  createPlan(plans: Plans): Observable<Plans> {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Plans>(this.plansUrl, plans, { headers })
      .pipe(
        tap(data => data),
      );
  }

  deletePlan(id: number): Observable<Plans> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.plansUrl}/${id}`;
    return this.http.delete<Plans>(url, { headers })
      .pipe(
        tap(data => data),
      );
  }
  updatePlan(plan: Plans): Observable<Plans> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.plansUrl}/${plan.id}/edit`;
    return this.http.put<Plans>(url, plan, { headers })
      .pipe(
        tap(() => console.log('updatePlan: ' + plan.id)),
        map(() => plan),
      );
  }


  private initializePlan(): Plans {
    return {
      id: null!,
      planType: null!,
      planCategory: null!,
      weekly_price: null!,
      monthly_price: null!,
      image: null,
      action: null,
      date: null!,
      meals: null!

    };
  }
}
