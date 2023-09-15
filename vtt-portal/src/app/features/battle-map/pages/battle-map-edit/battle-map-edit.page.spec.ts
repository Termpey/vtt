import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleMapEditPage } from './battle-map-edit.page';

describe('BattleMapEditPage', () => {
  let component: BattleMapEditPage;
  let fixture: ComponentFixture<BattleMapEditPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleMapEditPage]
    });
    fixture = TestBed.createComponent(BattleMapEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
