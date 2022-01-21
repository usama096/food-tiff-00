import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansEditComponent } from './components/plans-edit/plans-edit.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';
import { PlansViewComponent } from './components/plans-view/plans-view.component';

const routes: Routes = [
  {path: '', component: PlansListComponent},
  {path: 'add', component: PlansEditComponent },
  {path: ':id', component: PlansEditComponent},
  {path: ':id/edit', component: PlansEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
