import { CanActivateFn } from '@angular/router';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  let idusuario = localStorage.getItem('idusuario');
  if (idusuario)
    return true;
  else
    return false;
};
