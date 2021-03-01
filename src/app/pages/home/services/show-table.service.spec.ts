import { TestBed } from '@angular/core/testing';

import { ShowTableService } from './show-table.service';

describe('ShowTableService', () => {
  let service: ShowTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
