import { TestBed } from '@angular/core/testing';

import { AuthOperatorGuard } from './auth-operator.guard';

describe('AuthOperatorGuard', () => {
  let guard: AuthOperatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOperatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
