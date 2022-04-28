import { TestBed } from '@angular/core/testing';

import { AuthDoctorGuard } from './auth-doctor.guard';

describe('AuthDoctorGuard', () => {
  let guard: AuthDoctorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthDoctorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
