import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../authentication/services/auth.service';
import { signOut } from '../authentication/state/auth.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hidden = true;
  userName: string = 'Dota';
  mobileNumber!: any
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    ) {
  }

  visibility() {
    this.hidden = !this.hidden;
  }
  logOut() {
    this.store.dispatch(signOut());
    this.store.select((state: any) => console.log('logout state is: ',state))
    localStorage.removeItem('accessToken')
    console.log('User is Logged out')
    this.router.navigate(['/authentication'],{relativeTo: this.route})
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: any) => {
        this.mobileNumber = params.mn
      }
    )
    // this.authService.getUser().subscribe(
    //   (res: any[]) => {
    //     res.filter(data => {
    //       if (this.mobileNumber === data.mobileNumber) {
    //         this.userName = data.firstName
    //       }
    //     })
    //   }
    // )
  }
}

