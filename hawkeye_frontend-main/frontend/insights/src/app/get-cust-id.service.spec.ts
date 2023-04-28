import { TestBed } from '@angular/core/testing';

import { GetCustIdService } from './get-cust-id.service';

describe('GetCustIdService', () => {
  let service: GetCustIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
