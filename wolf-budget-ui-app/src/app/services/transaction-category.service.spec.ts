import { TestBed } from '@angular/core/testing';

import { TransactionCategoryService } from './transaction-category.service';

describe('TransactionCategoryService', () => {
  let service: TransactionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
