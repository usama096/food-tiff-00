import { environment } from './../../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MealType } from 'src/app/shared/enums/enums';
import { PlansService } from '../../services/plans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefDataService } from 'src/app/shared/services/ref-data.service';
import { Product } from 'src/app/dashboard/products/models/products';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { PlanProducts } from '../../models/plan-products-model';
@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss'],
})
export class MealPlannerComponent implements OnInit {
  @Input('start') startDate!: Date;
  @Input('end') endDate!: Date;
  @Input('mealtype') mealtype!: MealType;
  @Input('newlyCreatedPlanId') newPlanId!: number;

  @Output() onDataSelected = new EventEmitter<any>();
  mealForm!: FormGroup;
  isPublished: boolean = false;
  displayedColumns: string[] = ['servingDate'];
  filteredMeals: any = [];
  dates: any[] = [];
  mealCount: number = 0;
  dailyMeals: any[] = [];
  meals: Product[] = [];
  mealName: string = 'yes';
  @Input() planProduct!: PlanProducts[];
  planProductsTobeSent!: PlanProducts[];
  isReadOnly: boolean = false;
  viewPlan!:string;
  id!: number;
  constructor(
    private planService: PlansService,
    private refDataService: RefDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.mealForm = this.fb.group({
      isPublished: true,
      mealFilter: [''],
      planProductsArr: this.fb.array([]),
    })
  }

  get planProductsArr() {
    return this.mealForm.get("planProductsArr") as FormArray;
  }

  private _loadMealsByType(mealType: MealType) {
    if (this.mealtype == MealType.BreakFast) {
      this.mealCount = environment.breakfast_meal_count;
    } else if (this.mealtype == MealType.Lunch) {
      this.mealCount = environment.lunch_meal_count;
    } else if (this.mealtype == MealType.Dinner) {
      this.mealCount = environment.dinner_meal_count;
    } else if (this.mealtype == MealType.Supper) {
      this.mealCount = environment.supper_meal_count;
    }
    for (let i = 1; i <= this.mealCount; i++) {
      const col = `Meal ${i}`;
      this.dailyMeals.push(col);
      this.displayedColumns.push(col);
    };
    this.displayedColumns.push('publish');
    this.displayedColumns.push('save');

  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.refDataService.availableProducts().subscribe(res => {
      this.meals = res.filter(meal => {
        return meal.prodType == 'MEAL'
      });
    })
    this.store.select((state: any) => state.plan).subscribe((res) => {
      if (!res) {
        return;
      }
      return res;
    })
    this._loadMealsByType(this.mealtype);
    this.mealForm.controls["mealFilter"].valueChanges.subscribe((val) => {
      this.filteredMeals = this.meals.filter(
        (meal) => meal.name.toLowerCase().indexOf(val) !== -1
      );
    });
    this.filteredMeals = this.meals;
    this.onDateSelected();

    if (this.router.url === `/dashboard/plans/${this.id}`) {
      this.planProductsArr.disable();
      this.viewPlan = this.router.url;
    };


  };

  onDateSelected() {

    let dates: Date[] = [];
    let planProductsData = this.planProduct;
    let id = +this.route.snapshot.paramMap.get('id')!;

    let fg: FormGroup;
    if (this.startDate && this.endDate) {
      dates = this.getDates();
    }

    dates.map((date) => {
      let servingDate = date.toISOString();
      if ((this.id | this.newPlanId) && planProductsData) {
        let filterDataByServingDate = planProductsData.filter((planProductsData) => {
          return planProductsData.servingDate == servingDate;
        })

        fg = new FormGroup({
          planId: new FormControl(this.id ?? this.newPlanId, Validators.required),
          meals: new FormArray([]),
          servingDate: new FormControl(servingDate),
          isPublished: new FormControl(filterDataByServingDate[0]?.isPublished ?? false, Validators.required)
        });
        const mealFormArray = fg.get('meals') as FormArray;
        this.dailyMeals.forEach((meal: any, i) => {
          let mealfg = new FormGroup({
            id: new FormControl(0, Validators.required),
            productId: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),


          })
          mealFormArray.push(mealfg);
        })
        this.planProductsArr.push(fg);

        filterDataByServingDate.forEach((obj, i) => {
          const mfg = mealFormArray.controls[i] as FormGroup;
          mfg.setValue({
            id: obj.id,
            productId: obj.productId,
            name: obj.product?.name
          })
        })
      }

      // else {
      //   fg = new FormGroup({
      //     planId: new FormControl(0, Validators.required),
      //     meals: new FormArray([]),
      //     servingDate: new FormControl(servingDate, Validators.required),
      //     isPublished: new FormControl(false, Validators.required)
      //   });
      //   const mealFormArray = fg.get('meals') as FormArray;
      //   this.dailyMeals.forEach((meal: any, i) => {
      //     let mealfg = new FormGroup({
      //       id: new FormControl(0, Validators.required),
      //       productId: new FormControl(),
      //     })
      //     mealFormArray.push(mealfg);
      //   })
      //   this.planProductsArr.push(fg);

      // }
    });
    // this.sendDataToParent();
  }
  productId: number = 0;
  onProductChange(event: any, product: FormGroup) {
    this.productId = event.value;
  }
  // sendDataToParent() {
  //   this.onDataSelected.emit(this.planProductsArr.value);
  // }
  getDates(): Date[] {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(+end - +start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let dates: Date[] = [];
    for (let i = 0; i <= days; i++) {
      if (start.getTime() <= end.getTime()) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    }
    return dates;
  };
  savePlanProducts(data: FormGroup) {
    let meals: any[] = data.get("meals")?.value
    this.planProductsTobeSent = [];
    let meal: PlanProducts;
    meals.forEach((m: any) => {
      meal = {
        id: m.id,
        planId: this.id ? this.id : this.newPlanId,
        productId: m.productId,
        servingDate: data.get("servingDate")?.value,
        isPublished: data.get("isPublished")?.value,
      }
      if (meal['productId']) {
        this.planProductsTobeSent.push(meal);
      }
    })
    if (this.planProductsTobeSent.length === meals.length) {
      this.planService.createPlanProducts(this.planProductsTobeSent).subscribe(res => {
        if (res) {
          this.toaster.success('Products updated successfully', 'Success')
        }
      })
    }
    else {
      this.toaster.error("Please select all meals against a particulat date!", "Error!")
    }
  }
}
