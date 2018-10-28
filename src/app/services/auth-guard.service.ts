import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'

import { AuthService } from 'angularx-social-login';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.authService.authState.subscribe((user) => {
            // if user is logged-in and trying to open login page. Do not allow to open
            /*if (user && state.url.indexOf('login') > -1) {
                this.router.navigate([ '/features/dashboard' ]);
                resolve(false);
            }*/

            // if user is not logged-in and trying to open login page. Do allow to open
            if (!user && state.url.indexOf('login') > -1) {
                resolve(true)
            }

            // Allow user to visit the route if user is authenticated
            else if (user) {
                resolve(true)
            }

            // Do not let user visit the route
            else {
                // localStorage.removeItem('autho_token');
                // this.router.navigate([ '/login' ]);
                // resolve(false);

                // resolve(true);
            }
        });
    });
  }
}
