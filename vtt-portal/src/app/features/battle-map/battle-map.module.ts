import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BattleMapRoutingModule } from './battle-map-routing.module';
import { GridSquareComponent } from './components/grid-square/grid-square.component';
import { BattleMapPage } from './pages/battle-map/battle-map.page';
import { BattleMapCanvasComponent } from './components/battle-map-canvas/battle-map-canvas.component';
import { BattleMapEditPage } from './pages/battle-map-edit/battle-map-edit.page';
import { BattleMapService } from 'src/app/shared/service/battle-map.service';


@NgModule({
  declarations: [
    GridSquareComponent,
    BattleMapPage,
    BattleMapCanvasComponent,
    BattleMapEditPage
  ],
  providers: [BattleMapService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BattleMapRoutingModule
  ]
})
export class BattleMapModule { }
