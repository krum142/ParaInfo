import { TestBed } from '@angular/core/testing';

import { GliderService } from './glider.service';

describe('GliderService', () => {
  let service: GliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
