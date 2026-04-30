import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { stockLoadResolverResolver } from './stock-load-resolver-resolver';

describe('stockLoadResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => stockLoadResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
