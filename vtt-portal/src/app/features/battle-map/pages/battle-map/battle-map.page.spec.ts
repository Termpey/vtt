import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleMapPage } from './battle-map.page';

describe('BattleMapPage', () => {
  let component: BattleMapPage;
  let fixture: ComponentFixture<BattleMapPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleMapPage]
    });
    fixture = TestBed.createComponent(BattleMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
