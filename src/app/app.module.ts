import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './shared/product-data';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPrintModule } from 'ngx-print';
import { HeaderInterceptor } from './header.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './authentication/state/auth.reducer';
import { AuthEffects } from './authentication/state/auth.effect';
import { productReducer } from './dashboard/products/state/product.reducer';
import { planReducer } from './dashboard/plans/state/plan.reducer';
import { userReducer } from './dashboard/users/state/user.reducer';

import { orderReducer } from './dashboard/orders/state/order.reducer';
import { ProductEffects } from './dashboard/products/state/product.effect';
import { UserEffects } from './dashboard/users/state/user.effect';

import { PlanEffects } from './dashboard/plans/state/plan.effect';
import { OrderEffects } from './dashboard/orders/state/order.effect';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxChartsModule,
    NgxMatSelectSearchModule,
    NgxPrintModule,
    // InMemoryWebApiModule.forRoot(ProductData),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    StoreModule.forRoot({ auth: authReducer, product: productReducer, plan: planReducer, order: orderReducer,user:userReducer }),
    EffectsModule.forRoot([AuthEffects,ProductEffects,PlanEffects,OrderEffects,UserEffects]),

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule { }
