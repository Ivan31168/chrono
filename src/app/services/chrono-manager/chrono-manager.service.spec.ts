import { TestBed } from '@angular/core/testing';

import { ChronoManagerService } from './chrono-manager.service';

describe('ChronoManagerService', () => {
  let service: ChronoManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronoManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
