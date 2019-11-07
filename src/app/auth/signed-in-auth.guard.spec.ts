import { TestBed, async, inject } from '@angular/core/testing';

import { SignedInAuthGuard } from './signed-in-auth.guard';

describe('SignedInAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedInAuthGuard]
    });
  });

  it('should ...', inject([SignedInAuthGuard], (guard: SignedInAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
