import { TestBed } from '@angular/core/testing';

import { GetTiffsService } from './get-tiffs.service';

describe('GetTiffsService', () => {
  let service: GetTiffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTiffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
