import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductData } from '../../shared/product-data';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrdersByAddressComponent } from './orders-by-address/orders-by-address.component';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersListComponent,
    OrdersViewComponent,
    OrdersByAddressComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
    SharedModule
  ],
  providers:[
    ProductData
  ]

})
export class OrdersModule { }
