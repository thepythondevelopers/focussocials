import { TestBed } from '@angular/core/testing';

import { GetInstaAccountsService } from './get-insta-accounts.service';

describe('GetInstaAccountsService', () => {
  let service: GetInstaAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInstaAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
