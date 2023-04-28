import { TestBed } from '@angular/core/testing';

import { UpdateProfileImageService } from './update-profile-image.service';

describe('UpdateProfileImageService', () => {
  let service: UpdateProfileImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProfileImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
