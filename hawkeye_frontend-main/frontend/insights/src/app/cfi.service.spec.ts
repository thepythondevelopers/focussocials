import { TestBed } from '@angular/core/testing';

import { CfiService } from './cfi.service';

describe('CfiService', () => {
  let service: CfiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
