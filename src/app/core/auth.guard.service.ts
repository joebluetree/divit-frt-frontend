import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { GlobalService } from './services/global.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gs = inject(GlobalService);

  constructor() { }

  IsAuthenticated(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.gs.isAuthenticated()) {
      return true;
    }
    else {
      this.gs.logout();
      return false;
    }
  }

  IsAutherised(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.gs.isAutherised()) {
      return true;
    }
    else {
      return false;
    }
  }

  IsLoggedOut(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.gs.isAuthenticated() && this.gs.isAutherised()) {
      return false;
    }
    else {
      return true;
    }
  }



}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).IsAuthenticated(next, state);
}

export const AuthGuardAuthrised: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).IsAutherised(next, state);
}

export const AuthGuardLogin: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).IsLoggedOut(next, state);
}

