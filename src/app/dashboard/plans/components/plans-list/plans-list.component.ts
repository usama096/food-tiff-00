import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Plans } from '../../models/plans-model';
import { PlansService } from '../../services/plans.service';
import { getPlans } from '../../state/plan.action';

@Component({
  selector: 'app-plans-list',
  styleUrls: ['./plans-list.component.scss'],
  templateUrl: './plans-list.component.html',
})
export class PlansListComponent implements OnInit {

  title = "Plans List"
  imageWidth = 50;
  imageMargin = 2;
  errorMessage!: string
  plans!: Plans;
  displayedColumns: string[] = ['id', 'planType', 'weekly_price', 'monthly_price', 'image', 'action'];
  dataSource: any = [];
  selectedPlans: any = [];
  planCategories = [
    {
      id: 1,
      name: 'Executive'
    },
    {
      id: 2,
      name: 'Economy'
    },
    {
      id: 3,
      name: 'Low Cal'
    }

  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
    this.store.dispatch(getPlans());
    this.store.select((state: any) => state.plan.plans).subscribe(
      (res) => {
        if(!res){
          return;
        }
        this.dataSource = res;
        this.filterPlans(this.planCategories[0].name)
      }
    )
  }
  addPlan() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }
  filterPlans(planCategory: string) {
    this.selectedPlans = this.dataSource.filter((x: any) => {
      return x.planCategory === planCategory;
    });
  }
  ngOnInit(): void {
  }
}
