import { TestBed } from '@angular/core/testing';

import { DatabaseadminService } from './databaseadmin.service';

describe('DatabaseadminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseadminService = TestBed.get(DatabaseadminService);
    expect(service).toBeTruthy();
  });
});
