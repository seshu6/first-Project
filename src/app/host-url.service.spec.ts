import { TestBed } from '@angular/core/testing';

import { HostUrlService } from './host-url.service';

describe('HostUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostUrlService = TestBed.get(HostUrlService);
    expect(service).toBeTruthy();
  });
});
