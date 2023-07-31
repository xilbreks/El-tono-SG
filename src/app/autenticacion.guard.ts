import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let idusuario = localStorage.getItem('idusuario');
  if (!!idusuario) {
    return true;
  }
  else {
    router.navigate(['/', 'login']);
    return false;
  }
};