import { Store } from '@ngrx/store';
import { Plans } from './../../models/plans-model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../services/plans.service';
import { addPlan, getPlansById, updatePlan } from '../../state/plan.action';

@Component({
  selector: 'app-plans-edit',
  templateUrl: './plans-edit.component.html',
  styleUrls: ['./plans-edit.component.scss'],
})
export class PlansEditComponent implements OnInit {
  title = 'Food Plan';
  imageWidth = 30;
  imageMargin = 2;
  dateRangeFg!: FormGroup;
  plans: Plans[] = [];
  dates: any = [];
  todayDate: Date = new Date();
  endDate: Date = new Date();
  showMessage: boolean = false;
  isReadOnlymode: boolean = true;
  planType: string = '';
  planInfoFg!: FormGroup;
  loadMeals: boolean = true;
  filteredMeals: any = [];
  plansList = [
    { planCategory: 'Executive', planType: 'BreakFast' },
    { planCategory: 'Economy', planType: 'Lunch' },
    { planCategory: 'Low Cal', planType: 'Dinner' },
  ];
  constructor(
    private planService: PlansService,
    private router: Router,
    private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private store: Store
  ) {
    this.endDate.setDate(this.todayDate.getDate() + 14);
    this.planService.getPlans().subscribe((plans) => {
      this.plans = plans;
    });
    this.dateRangeFg = new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    });
    this.planInfoFg = new FormGroup({
      planCategory: new FormControl('', Validators.required),
      planType: new FormControl('', Validators.required),
      description: new FormControl('Description here!', Validators.required),
      weekly_price: new FormControl('', Validators.required),
      monthly_price: new FormControl(),
      mealFilterCtrl: new FormControl(''),
      id: new FormControl(),
      meal1: new FormControl(),
      meal2: new FormControl(),
      meal3: new FormControl(),
      date: new FormControl()
    });
  }
  ngOnInit(): void {
    this.planInfoFg.get('planType')?.valueChanges.subscribe((val) => {
      if (val) {
        this.loadMeals = false;
        this._cdr.detectChanges();
        this.loadMeals = true;
      }
    });
    if(+this.route.snapshot.paramMap.get('id')!)
    this.getPlan();
  }
  getPlan() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getPlansById({ id }));
    this.store
      .select((state: any) => state.plan.plan)
      .subscribe((res) => {
        if (!res) {
          return;
        }
        this.planInfoFg.get('planType')?.setValue(res.planType);
        this.planInfoFg.get('planCategory')?.setValue(res.planCategory);
        this.planInfoFg.get('weekly_price')?.setValue(res.weekly_price);
        this.planInfoFg.get('monthly_price')?.setValue(res.monthly_price);
        this.planInfoFg.get('date')?.setValue(res.date);

        this.planInfoFg.get('meal1')?.setValue(res.meals[0].meal1),
          this.planInfoFg.get('meal2')?.setValue(res.meals[0].meal2),
          this.planInfoFg.get('meal3')?.setValue(res.meals[0].meal3);
      });
  }
  onCancel() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.router.url;
    if (url == `/dashboard/plans/${id}/edit`) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else this.router.navigate(['../'], { relativeTo: this.route });
  }

  savePlan() {
    if (!this.planInfoFg.valid) {
      this.planInfoFg.markAllAsTouched();
    }
    let meals = [
      { meal1:  this.planInfoFg.get('meal1')?.value ,
        meal2:  this.planInfoFg.get('meal2')?.value,
        meal3:  this.planInfoFg.get('meal3')?.value }
    ]

    let id = +this.route.snapshot.paramMap.get('id')!;
    if (!id) {
      let plan = { ...this.planInfoFg.value };
      this.store.dispatch(addPlan({ plan }));
      this.store
        .select((state: any) => state.plan.plan)
        .subscribe((res) => res);
      this.router.navigate(['dashboard/plans']);
    }
    if (id) {
      let plan = { ...this.planInfoFg.value, meals:meals, id };
      this.store.dispatch(updatePlan({ plan }));
      this.store
        .select((state: any) => state.plan.plan)
        .subscribe((res) => {
          this.plans = res;
        });
      this.router.navigate(['dashboard/plans']);
      return;
    }
  }

  meals = [
    {
      id: 1,
      name: 'Chicken',
      imageUrl: './assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 2,
      name: 'mutton',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 3,
      name: 'Byrant',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 4,
      name: 'Daal',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 5,
      name: 'Sabic',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 6,
      name: 'Biryani',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 7,
      name: 'Pulao',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 8,
      name: 'Daleem',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 9,
      name: 'Bhindi',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 10,
      name: 'Kareela',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 11,
      name: 'Fresh Juice',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 12,
      name: 'Daal Mash',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
  ];
}
