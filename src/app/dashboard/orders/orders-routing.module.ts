import { OrdersByAddressComponent } from './components/orders-by-address/orders-by-address.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: '', component: OrdersComponent },
      {path: 'oba', component: OrdersByAddressComponent},
      { path: ':id', component: OrdersViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
