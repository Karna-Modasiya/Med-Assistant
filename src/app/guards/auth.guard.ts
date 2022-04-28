import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('isAuth') == 'true')
      {
        if (localStorage.getItem('usertype') == 'patient')
        {
          return this.router.createUrlTree(['patient']);
        }
        else if (localStorage.getItem('usertype') == 'doctor')
        {
          return this.router.createUrlTree(['doctor']);
        }
        else if (localStorage.getItem('usertype') == 'operator')
        {
          return this.router.createUrlTree(['operator']);
        }
      }
      return true;
  } 
}