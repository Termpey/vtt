import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleMapCanvasComponent } from './battle-map-canvas.component';

describe('BattleMapCanvasComponent', () => {
  let component: BattleMapCanvasComponent;
  let fixture: ComponentFixture<BattleMapCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleMapCanvasComponent]
    });
    fixture = TestBed.createComponent(BattleMapCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
