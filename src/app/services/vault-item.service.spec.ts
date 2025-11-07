import { TestBed } from '@angular/core/testing';

import { VaultItemService } from './vault-item.service';

describe('VaultItemService', () => {
  let service: VaultItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaultItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
