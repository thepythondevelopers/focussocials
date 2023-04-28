import { TestBed } from '@angular/core/testing';

import { FillInstaAccountsService } from './fill-insta-accounts.service';

describe('FillInstaAccountsService', () => {
  let service: FillInstaAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillInstaAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
