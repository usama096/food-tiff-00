import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersComponent } from './users.component';
import { UserResolver } from './services/user.resolver';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', component: UsersListComponent },
      {path: ':id', component: UsersEditComponent,resolve:{resolvedData: UserResolver}},
      {path: ':id/edit', component: UsersEditComponent,resolve:{resolvedData: UserResolver}},
      {path: 'add', component: UsersEditComponent,resolve:{resolvedData: UserResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
