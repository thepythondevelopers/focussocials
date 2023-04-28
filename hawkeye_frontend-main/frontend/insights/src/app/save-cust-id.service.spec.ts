import { TestBed } from '@angular/core/testing';

import { SaveCustIdService } from './save-cust-id.service';

describe('SaveCustIdService', () => {
  let service: SaveCustIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCustIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
