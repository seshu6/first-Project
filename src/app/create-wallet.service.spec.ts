import { TestBed } from '@angular/core/testing';

import { CreateWalletService } from './create-wallet.service';

describe('CreateWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateWalletService = TestBed.get(CreateWalletService);
    expect(service).toBeTruthy();
  });
});
