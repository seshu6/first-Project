import { TestBed } from '@angular/core/testing';

import { CommonDashboardService } from './common-dashboard.service';

describe('CommonDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonDashboardService = TestBed.get(CommonDashboardService);
    expect(service).toBeTruthy();
  });
});
