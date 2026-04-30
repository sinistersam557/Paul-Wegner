import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createStockDeactivateGuard } from './create-stock-deactivate-guard';

describe('createStockDeactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => createStockDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
