import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { selectIsAdmin, selectIsAuthenticated } from '../store/auth/auth.selectors';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return combineLatest([
      this.store.select(selectIsAuthenticated),
      this.store.select(selectIsAdmin)
    ]).pipe(
      take(1),
      map(([isAuthenticated, isAdmin]) => {
        if (isAuthenticated && isAdmin) {
          return true;
        }

        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/catalogo']);
        }
        return false;
      })
    );
  }
}
