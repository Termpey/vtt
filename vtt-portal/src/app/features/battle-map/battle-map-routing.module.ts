import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleMapPage } from './pages/battle-map/battle-map.page';
import { BattleMapEditPage } from './pages/battle-map-edit/battle-map-edit.page';

const routes: Routes = [
  {path: "", component: BattleMapPage},
  {path: "edit", component: BattleMapEditPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleMapRoutingModule { }
