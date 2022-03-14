/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SysSettingsService } from './codeList.service';

describe('Service: SysSettings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SysSettingsService]
    });
  });

  it('should ...', inject([SysSettingsService], (service: SysSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
