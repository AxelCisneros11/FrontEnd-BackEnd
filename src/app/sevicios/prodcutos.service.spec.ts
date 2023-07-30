import { TestBed } from '@angular/core/testing';

import { ProdcutosService } from './prodcutos.service';

describe('ProdcutosService', () => {
  let service: ProdcutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
