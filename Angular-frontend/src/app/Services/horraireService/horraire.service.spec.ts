import { TestBed } from '@angular/core/testing';

import { HorraireService } from './horraire.service';

describe('HorraireService', () => {
  let service: HorraireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorraireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
