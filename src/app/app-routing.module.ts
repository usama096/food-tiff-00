import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/services/auth.guard';
import { IsloggedinGuard } from './authentication/services/isloggedin.guard';
import { PageNotFoundComponent } from './page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [IsloggedinGuard]

  },
  { path: '**', component: PageNotFoundComponent }
];
// canActivate: [AuthGuard]
// canActivate: [IsloggedinGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
