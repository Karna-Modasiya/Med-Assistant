import { TestBed } from '@angular/core/testing';

import { AuthPatientGuard } from './auth-patient.guard';

describe('AuthGuard', () => {
  let guard: AuthPatientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPatientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
