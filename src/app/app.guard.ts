import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from './app.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const appService = inject(AppService);
  const router = inject(Router);

  return appService.usuario$.pipe(
    take(1),
    map(user => {
      if (user) return true;
      return router.createUrlTree(['/login']); 
    })
  );
};

export const guestGuard: CanActivateFn = (route, state) => {
  const appService = inject(AppService);
  const router = inject(Router);

  return appService.usuario$.pipe(
    take(1),
    map(user => {
      if (user) {
        return router.createUrlTree(['recursos']);
      } else {
        return true;
      }
    })
  );
};