import { TestBed } from '@angular/core/testing';

import { ConversorApiService } from './conversor-api.service';

describe('ConversorApiService', () => {
  let service: ConversorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
