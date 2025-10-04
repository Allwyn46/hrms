import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('loggedinUser');

  if (isLoggedIn) {
    router.navigateByUrl('dashboard');
    return false;
  } else {
    return true;
  }
};
