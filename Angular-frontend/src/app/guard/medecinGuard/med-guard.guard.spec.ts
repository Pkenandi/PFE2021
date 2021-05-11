import { TestBed } from '@angular/core/testing';

import { MedGuardGuard } from './med-guard.guard';

describe('MedGuardGuard', () => {
  let guard: MedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
