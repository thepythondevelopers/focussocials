import { TestBed } from '@angular/core/testing';

import { EngagementInteractionsService } from './engagement-interactions.service';

describe('EngagementInteractionsService', () => {
  let service: EngagementInteractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagementInteractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
