import { TestBed } from '@angular/core/testing';

import { CheckUserPlanService } from './check-user-plan.service';

describe('CheckUserPlanService', () => {
  let service: CheckUserPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUserPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
