import { TestBed } from '@angular/core/testing';

import { VaultService } from './vault.service';

describe('VaultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VaultService = TestBed.get(VaultService);
    expect(service).toBeTruthy();
  });
});
