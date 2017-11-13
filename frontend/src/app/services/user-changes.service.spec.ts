import { TestBed, inject } from '@angular/core/testing';

import { UserChangesService } from './user-changes.service';

describe('UserChangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserChangesService]
    });
  });

  it('should be created', inject([UserChangesService], (service: UserChangesService) => {
    expect(service).toBeTruthy();
  }));
});
