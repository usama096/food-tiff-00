import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { UpcomingOrdersComponent } from './home/upcoming-orders/upcoming-orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UpcomingOrdersComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class DashboardModule { }
