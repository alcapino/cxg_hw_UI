import { TestBed, inject } from '@angular/core/testing';

import { CxgApiService } from './cxg-api.service';

describe('CxgApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CxgApiService]
    });
  });

  it('should be created', inject([CxgApiService], (service: CxgApiService) => {
    expect(service).toBeTruthy();
  }));
});
