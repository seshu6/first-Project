import { TestBed } from '@angular/core/testing';

import { TwoStepsVerificationService } from './two-steps-verification.service';

describe('TwoStepsVerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwoStepsVerificationService = TestBed.get(TwoStepsVerificationService);
    expect(service).toBeTruthy();
  });
});
