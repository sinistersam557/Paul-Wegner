import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/user-store';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStoreService);
  const router = inject(Router);
  console.log('AuthGuard#canActivate called');
  if (userStore.isLoggedIn()) {
    return true;
  }
  console.log('AuthGuard#canActivate not authorized to access page');
  router.navigate(['/login']);
  return false;
};
