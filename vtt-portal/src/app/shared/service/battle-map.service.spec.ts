import { TestBed } from '@angular/core/testing';

import { BattleMapService } from './battle-map.service';

describe('BattleMapService', () => {
  let service: BattleMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
