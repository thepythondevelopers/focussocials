import { TestBed } from '@angular/core/testing';

import { CreateSuscriptionService } from './create-suscription.service';

describe('CreateSuscriptionService', () => {
  let service: CreateSuscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSuscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
