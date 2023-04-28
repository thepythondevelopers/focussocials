import { TestBed } from '@angular/core/testing';

import { SaveSubscriptionService } from './save-subscription.service';

describe('SaveSubscriptionService', () => {
  let service: SaveSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
