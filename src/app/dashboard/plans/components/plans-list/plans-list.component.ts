import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CodeListService } from 'src/app/dashboard/code-lists/services/codeList.service';
import { CodelistItem } from 'src/app/shared/models/codelists-model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Plan } from '../../models/plan-model';
import { PlansService } from '../../services/plans.service';
import { deletePlan, getPlans } from '../../state/plan.action';

@Component({
  selector: 'app-plans-list',
  styleUrls: ['./plans-list.component.scss'],
  templateUrl: './plans-list.component.html',
})
export class PlansListComponent implements OnInit, OnDestroy {

  title = "Plans List"
  imageWidth = 50;
  imageMargin = 2;
  errorMessage!: string
  plan!: Plan;
  displayedColumns: string[] = ['id', 'planType', 'perMealPrice', 'isPublished', 'action'];
  dataSource!: Plan[];
  selectedPlans: any = [];
  planCategories!: CodelistItem[];
  isPublished!: boolean;
  queryPlan!: string;

  planListSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private shared: SharedService,
    private plansService: PlansService,
    private toaster: ToastrService,
    private codelistS: CodeListService
  ) {

    this.store.dispatch(getPlans());
    this.planListSub = this.store.select((state: any) => state.plan).subscribe(
      (res) => {
        if (!res) {
          return;
        }
        this.dataSource = res.plans;

      }
    )
  }

  addPlan() {
    this.router.navigate(['dashboard/plans/add'])
  }

  deletePlan(plan: Plan): void {
    let data = {
      title: 'Delete plan',
      button: 'Delete',
      description: 'Do you realy want to Delete',
      id: plan.id
    }
    this.shared.confirmItem(data).afterClosed().subscribe((res: any) => {
      const id = data.id!;
      if (res === true) {
        this.store.dispatch(deletePlan({ id }));
        this.store.dispatch(getPlans());
      }
    })
  }

  filterPlans(e: MatTabChangeEvent) {
    if (this.dataSource) {
      this.selectedPlans = this.dataSource.filter((x) => {
        return x.planCategory == e.tab.ariaLabel;
      });

    }
  }
  ngOnInit(): void {
    this.codelistS.getPlanCategory().subscribe(res => {
      this.planCategories = res;
    });
    this.route.queryParams.subscribe(param => {
      this.queryPlan = param.planCategory;
    });
  }
  ngOnDestroy(): void {
    this.planListSub.unsubscribe();
  }

  onToggleChange(e: MatSlideToggleChange, p: Plan) {
    let plan = {
      id: p.id,
      isPublished: e.checked,
      description: p.description,
      perMealPrice: p.perMealPrice,
      planType: p.planType,
      planCategory: p.planCategory,
      imageId: p.imageId
    }

    this.plansService.updatePlan(plan).subscribe(res => {
      if (res.isPublished) {
        this.toaster.success('Plan is Published', 'Success')
      }
      if (!res.isPublished) {
        this.toaster.success('Plan is unpublished', 'Success')
      }
    })
  }

}
