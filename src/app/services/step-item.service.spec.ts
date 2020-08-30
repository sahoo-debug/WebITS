import { TestBed } from '@angular/core/testing';

import { StepItemService } from './step-item.service';

describe('StepItemService', () => {
  let service: StepItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
