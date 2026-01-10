;

import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from './common.service';
import { getToken, getUserInfo } from '../../global/app.global';
import { RedirectService } from './redirect.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const commonService = inject(CommonService);
  const redirectService = inject(RedirectService);
  if (commonService.isBrowser()) {
    const token = getToken();
    const user = getUserInfo();
    if (!token) {
      redirectService.setLastUrl(state.url);
      return router.createUrlTree(['/login']);
    }
    else {

      if (route?.data['role'] != user.role) {
         redirectService.setLastUrl(state.url);
         alert(route?.parent?.data['role']);
        return router.createUrlTree(['/login']);
      }
      else {
        return true;
      }
    }
    redirectService.setLastUrl(state.url);
    return token ? true : router.createUrlTree(['/login']);
  }

  // Fallback for non-browser environments (e.g., SSR)
  return true;
};

