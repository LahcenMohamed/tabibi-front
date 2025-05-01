import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Navigation
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFlowGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Get navigation extras from router
    const navigation: Navigation | null = this.router.getCurrentNavigation();

    // Check if this navigation was triggered programmatically or internally
    // Navigation extras will be null if someone tried to access via browser URL
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['fromInternalNavigation']) {
      return true; // Allow access
    }

    // Redirect to home or authentication page
    return this.router.navigate(['auth','sign-up']); // Or any other appropriate page
  }
}
