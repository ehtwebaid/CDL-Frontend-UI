;

import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from './common.service';
import { getToken, getUserInfo } from '../../global/app.global';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const commonService = inject(CommonService);
  if (commonService.isBrowser()) {
    const token = getToken();
    const user = getUserInfo();
    if (!token) {
      return router.createUrlTree(['/']);
    }
    else {

      if (route?.parent?.data['role'] != user.role) {
        return router.createUrlTree(['/']);
      }
      else {
        return true;
      }
    }
    return token ? true : router.createUrlTree(['/']);
  }

  // Fallback for non-browser environments (e.g., SSR)
  return true;
};

