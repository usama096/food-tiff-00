import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsEditComponent,
    ProductsDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    // HttpClientModule,
    SharedModule
  ],
  exports: [ProductsComponent],
})
export class ProductsModule { }
