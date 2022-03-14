import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/plan-model';
import { PlanProducts } from '../models/plan-products-model';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plansUrl = `${environment.apiUrl}/plans`;

  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.plansUrl}`)
      .pipe(
        tap((data: any) => data),
      );
  }
  getPlan(id: number): Observable<Plan> {

    if (!id) {
      return of(this.initializePlan());
    }
    return this.http.get<Plan>(`${this.plansUrl}/${id}`)
      .pipe(
        tap((data: any) => data),
      );
  }
  getPlanProducts(id: number, startServeDate?: string, endServeDate?: string, isPublished?: boolean): Observable<PlanProducts[]> {
    let params = new HttpParams();
    if (startServeDate)
      params = params.append('startServeDate', startServeDate);
    if (endServeDate)
      params = params.append('endServeDate', endServeDate);
    if (isPublished)
      params = params.append('publishedOnly', isPublished);

    return this.http.get<PlanProducts>(`${this.plansUrl}/${id}/products`, { params })
      .pipe(
        tap((data: any) => data),
      );
  }

  createPlan(plans: Plan): Observable<Plan> {

    return this.http.post<Plan>(`${this.plansUrl}`, plans)
      .pipe(
        tap(data => data),
      );
  }

  deletePlan(id: number): Observable<Plan> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<Plan>(`${this.plansUrl}/${id}`, { headers })
      .pipe(
        tap(data => data),
      );
  }
  updatePlan(plan: Plan): Observable<Plan> {
    return this.http.patch<Plan>(`${this.plansUrl}/${plan.id}`, plan)
      .pipe(
        tap(() => console.log('updatePlan: ' + plan.id)),
      );
  }

  getOnlyPiblishedPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.plansUrl}/publishedOnly`)
      .pipe(
        tap((data: any) => data),
      );
  }

  createPlanProducts(planProducts: PlanProducts[]): Observable<PlanProducts[]> {
    return this.http.post<PlanProducts[]>(`${this.plansUrl}/products`, {planProducts: planProducts},)
      .pipe(
        tap(data => data),
      );
  };
  getTodaysPlanProducts(): Observable<PlanProducts[]> {
    let params = new HttpParams();
    let date = new Date().toISOString().split('T')[0];
    let isPublished = true;
      params = params.append('startServeDate', date);
      params = params.append('endServeDate', date);
      params = params.append('publishedOnly', isPublished);
    return this.http.get<PlanProducts>(`${this.plansUrl}/products`, { params })
      .pipe(
        tap((data: any) => data),
      );
  }


  private initializePlan(): Plan {
    return {
      id: null!,
      planType: null!,
      perMealPrice: null!,
      description: null!,
      isPublished: null!,
      planCategory: null!,
    };
  }
}
