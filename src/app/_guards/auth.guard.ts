import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../store/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn()
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
      this.router.navigate(['/auth'])
      return false
    }
    return true
  }
  // Source : https://levelup.gitconnected.com/angular-route-guards-for-authentication-d77fb01f04ae
}
