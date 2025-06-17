import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notUserGuard } from './not-auth.guard';

describe('notUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => notUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
