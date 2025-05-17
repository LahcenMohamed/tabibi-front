import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

/**
 *
 */
constructor(private router: Router) {
}
canActivate(): boolean {
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    this.router.navigate(['auth','sign-in']); // or your login route
    return false;
  }
  }
}
