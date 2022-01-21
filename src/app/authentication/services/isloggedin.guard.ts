import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isloggedIn = this.authService.isUserLoggedIn();
    if(isloggedIn) {
      this.router.navigate(['dashboard'],{relativeTo: this.route});
      return false;
    } else {
      return true;
    }
  }

}
