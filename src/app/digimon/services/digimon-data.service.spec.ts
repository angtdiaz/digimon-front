import { TestBed } from '@angular/core/testing';

import { DigimonDataService } from './digimon-data.service';

describe('DigimonDataService', () => {
  let service: DigimonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigimonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
