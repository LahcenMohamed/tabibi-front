import { TestBed } from '@angular/core/testing';

import { SignUpDataService } from './sign-up-data.service';

describe('SignUpDataService', () => {
  let service: SignUpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
