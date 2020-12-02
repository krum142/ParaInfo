import { TestBed } from '@angular/core/testing';

import { ParagliderService } from './paraglider.service';

describe('ParagliderService', () => {
  let service: ParagliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
