import { TestBed } from '@angular/core/testing';

import { BuyAndSellService } from './buy-and-sell.service';

describe('BuyAndSellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyAndSellService = TestBed.get(BuyAndSellService);
    expect(service).toBeTruthy();
  });
});
