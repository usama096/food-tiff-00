import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductResolver } from './services/products-resolver.service';


const routes: Routes = [
  {path: '', component: ProductsListComponent},
  {path: 'add', component: ProductsEditComponent, resolve:{resolvedData: ProductResolver}},
  {path: ':id', component: ProductsEditComponent, resolve:{resolvedData: ProductResolver}},
  {path: ':id/edit', component: ProductsEditComponent, resolve:{resolvedData: ProductResolver}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
