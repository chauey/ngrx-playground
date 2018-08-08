import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isLoggedIn } from '@app/auth/auth.selectors';
import { AppState } from '@app/store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private store: Store<AppState>, private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>  {

    return this.store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {

          if (!loggedIn) {
            this.router.navigateByUrl('/login');
          }

        })
    );

  }

}
