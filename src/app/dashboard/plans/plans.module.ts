import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';
import { PlansEditComponent } from './components/plans-edit/plans-edit.component';
import { PlansViewComponent } from './components/plans-view/plans-view.component';
 import { MaterialModule} from '../../material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductData } from 'src/app/shared/product-data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectMealComponent } from './components/meal-planner/select-meal/select-meal.component';
import { FoodPlanComponent } from './components/plans-edit/food-plan/food-plan.component';
@NgModule({
  declarations: [
    PlansComponent,
    PlansListComponent,
    PlansEditComponent,
    PlansViewComponent,
    MealPlannerComponent,
    SelectMealComponent,
    FoodPlanComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    SharedModule
  ],
  providers: [ProductData]
})
export class PlansModule { }
