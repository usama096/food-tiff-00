/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RefDataService } from './ref-data.service';

describe('Service: Codelists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefDataService]
    });
  });

  it('should ...', inject([RefDataService], (service: RefDataService) => {
    expect(service).toBeTruthy();
  }));
});
