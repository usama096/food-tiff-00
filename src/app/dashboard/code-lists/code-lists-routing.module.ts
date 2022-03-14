import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCodeListsComponent } from './components/view-codeLists/view-codeLists.component';

const routes: Routes = [
  {path: '',component:ViewCodeListsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeListsRoutingModule { }
