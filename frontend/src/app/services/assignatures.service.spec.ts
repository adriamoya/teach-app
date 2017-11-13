import { TestBed, inject } from '@angular/core/testing';

import { AssignaturesService } from './assignatures.service';

describe('AssignaturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignaturesService]
    });
  });

  it('should be created', inject([AssignaturesService], (service: AssignaturesService) => {
    expect(service).toBeTruthy();
  }));
});
