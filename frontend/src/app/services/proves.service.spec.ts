import { TestBed, inject } from '@angular/core/testing';

import { ProvesService } from './proves.service';

describe('ProvesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvesService]
    });
  });

  it('should be created', inject([ProvesService], (service: ProvesService) => {
    expect(service).toBeTruthy();
  }));
});
