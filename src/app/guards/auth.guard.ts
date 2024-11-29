// auth.guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AddService } from '../add.service';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const isAuthenticated = this._auth.isAuthenticated(); // Implement this method in your AuthService

    if (!isAuthenticated) {
      this.router.navigate(['/admin/admin-home/:id']);
      return false;
    }

    return true;
  }
}
