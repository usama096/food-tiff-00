import { updatePlan } from './../../state/plan.action';
import { Store } from '@ngrx/store';
import { Plan } from '../../models/plan-model';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../services/plans.service';
import { addPlan, getPlansById, } from '../../state/plan.action';
import { PlanState } from '../../state/plan.reducer';
import { Subscription } from 'rxjs';
import { RefDataService } from 'src/app/shared/services/ref-data.service';
import { CodelistItem } from 'src/app/shared/models/codelists-model';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { PlanProducts } from '../../models/plan-products-model';

@Component({
  selector: 'app-plans-edit',
  templateUrl: './plans-edit.component.html',
  styleUrls: ['./plans-edit.component.scss'],
})
export class PlansEditComponent implements OnInit, OnDestroy {
  title = 'Food Plan';
  imageWidth = 30;
  imageMargin = 2;
  dateRangeFg!: FormGroup;
  plans: Plan[] = [];
  dates: any = [];
  todayDate: Date = new Date();
  endDate: Date = new Date();
  showMessage: boolean = false;
  isReadOnlymode: boolean = true;
  planType: string = '';
  planInfoFg!: FormGroup;
  loadMeals: boolean = true;
  filteredMeals: any = [];
  planProducts: PlanProducts[] = [];
  planState!: PlanState;
  planCategories!: CodelistItem[];
  newlyCreatedPlanId!: number;
  storeSubScription!: Subscription;
  id!: number;
  fileName!: string;
  imageSrc!: string | null | undefined;
  plansList: CodelistItem[] = [];

  constructor
    (
      private planService: PlansService,
      private router: Router,
      private route: ActivatedRoute,
      private _cdr: ChangeDetectorRef,
      private refDataService: RefDataService,
      private store: Store,
      private toaster: ToastrService,
      private fileUploadService: FileUploadService
  ) {

    this.endDate.setDate(this.todayDate.getDate() + 14);
    this.dateRangeFg = new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    });

    this.planInfoFg = new FormGroup({
      planCategory: new FormControl('', Validators.required),
      planType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      perMealPrice: new FormControl(null, Validators.required),
      imageId: new FormControl(''),
      id: new FormControl(),
    });

  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!
    this.storeSubScription = this.store
      .select((state: any) => state.plan)
      .subscribe((res) => {
        if (!res) {
          return
        }
        this.planState = res;
        this.setPlanInfoFormValue();
        if (res.addSuccess) {
          this.newlyCreatedPlanId = res.plan['id'];
          this.dateRangeFg.enable();
          this.toaster.success('Plan Added Successfully!', 'Success')
        }
        if (res.updateSuccess) {
          this.toaster.success('Plan Updated Successfully!', 'Success')
        }
      });

    this.refDataService.getPlanCategory().subscribe((res) => {
      this.planCategories = res;
    })

    this.refDataService.getPlanType().subscribe((res) => {
      this.plansList = res;
    })

    this.planInfoFg.get('planType')?.valueChanges.subscribe((val) => {
      if (val) {
        this.loadMeals = false;
        this._cdr.detectChanges();
        this.loadMeals = true;
      }
    });

    if (this.id) {
      this.getPlan();
    }
    const url = this.router.url;
    if (url === `/dashboard/plans/${this.id}`) {
      this.planInfoFg.disable();
      this.dateRangeFg.disable();
    }
    if (!this.id) {
      this.dateRangeFg.disable();
    }
  }

  ngOnDestroy(): void {
    this.storeSubScription.unsubscribe();
  }
  onFileUpload(event: any): void {
    console.log('event: ',event)
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file) {
        debugger
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file, file.name);

        this.fileUploadService.uploadFile(formData).subscribe((res) => {
          this.imageSrc = res.downloadUrl;
          this.planInfoFg.get('imageId')?.setValue(res.id);
        })
      }
    }
  }


  getPlan() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getPlansById({ id }));
    this.planService.getPlanProducts(id).subscribe(res => {
      if (res.length) {
        this.planProducts = res;
        this.setPlanProductsFormValue();
      }
    });
  }
  setPlanInfoFormValue() {
    this.planInfoFg.get('planType')?.setValue(this.planState.plan?.planType);
    this.planInfoFg.get('planCategory')?.setValue(this.planState.plan?.planCategory);
    this.planInfoFg.get('perMealPrice')?.setValue(this.planState.plan?.perMealPrice);
    this.planInfoFg.get('description')?.setValue(this.planState.plan?.description);
    this.planInfoFg.get('imageId')?.setValue(this.planState.plan?.image?.id);

    this.imageSrc = this.planState.plan?.image?.downloadUrl;

  }

  setPlanProductsFormValue() {
    let sortedDatesArr = this.planProducts.map(e => e.servingDate).sort();
    let start = sortedDatesArr[0];
    let end = sortedDatesArr[sortedDatesArr.length - 1];
    if (start && end) {
      this.dateRangeFg.get('start')?.setValue(start);
      this.dateRangeFg.get('end')?.setValue(end);
    }
  }

  onCancel() {
    this.router.navigate(['dashboard/plans'],{queryParams:{planCategory:this.planState.plan?.planCategory}});
  }

  // selectedMeals(event: any) {
  //   let id = +this.route.snapshot.paramMap.get('id')!;
  //   this.planProducts = [];
  //   let meal: any = {}
  //   event.forEach((pp: any) => {
  //     pp.meals.forEach((m: any) => {
  //       meal = {
  //         id: m.id,
  //         planId: pp.planId,
  //         productId: m.productId,
  //         servingDate: pp.servingDate,
  //         isPublished: pp.isPublished,
  //       }
  //       this.planProducts.push(meal);
  //     })
  //   })
  // }

  savePlan() {
    // this.saveProducts.sendDataToParent();
    let id = this.id;
    debugger
    let plan = {
      ...this.planInfoFg.value,
      // planProducts: this.planProducts,
      id,
      isPublished: false,
    };

    if (!this.planInfoFg.valid) {
      this.planInfoFg.markAllAsTouched();
    }
    if (!id) {
      this.store.dispatch(addPlan({ plan }));
    }
    if (id) {
      this.store.dispatch(updatePlan({ plan }))
      return;
    }
  }
}
