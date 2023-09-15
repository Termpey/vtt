import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleMapRoutingModule } from './battle-map-routing.module';
import { GridSquareComponent } from './components/grid-square/grid-square.component';
import { BattleMapPage } from './pages/battle-map/battle-map.page';
import { BattleMapCanvasComponent } from './components/battle-map-canvas/battle-map-canvas.component';
import { BattleMapEditPage } from './pages/battle-map-edit/battle-map-edit.page';



@NgModule({
  declarations: [
    GridSquareComponent,
    BattleMapPage,
    BattleMapCanvasComponent,
    BattleMapEditPage
  ],
  imports: [
    CommonModule,
    BattleMapRoutingModule
  ]
})
export class BattleMapModule { }
