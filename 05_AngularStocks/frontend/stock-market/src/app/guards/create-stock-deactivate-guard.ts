import { ActivatedRouteSnapshot, CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CreateStock } from '../stock/create-stock/create-stock';
import { Observable } from 'rxjs';

export const CreateStockDeactivateGuard: CanDeactivateFn<CreateStock> = (component,route, state, nextState) => {
  return window.confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.');
};
