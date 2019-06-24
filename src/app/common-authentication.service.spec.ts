import { TestBed } from '@angular/core/testing';

import { CommonAuthenticationService } from './common-authentication.service';

describe('CommonAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonAuthenticationService = TestBed.get(CommonAuthenticationService);
    expect(service).toBeTruthy();
  });
});
