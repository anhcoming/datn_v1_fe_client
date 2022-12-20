import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenService.loggedIn()) {
      if (state.url.includes('login') || state.url.includes('sign-up')) {
        console.log('co vao` day hay ko');
        this.router.navigate(['user/profile']);
      }
      console.log('token is valid');
      return false;
    } else {
      console.log('token is invalid');
      return true;
    }
  }
}
