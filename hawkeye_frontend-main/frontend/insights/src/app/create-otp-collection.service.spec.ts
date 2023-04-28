import { TestBed } from '@angular/core/testing';

import { CreateOtpCollectionService } from './create-otp-collection.service';

describe('CreateOtpCollectionService', () => {
  let service: CreateOtpCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOtpCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
