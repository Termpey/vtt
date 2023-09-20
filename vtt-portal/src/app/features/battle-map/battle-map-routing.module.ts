import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleMapPage } from './pages/battle-map/battle-map.page';
import { BattleMapEditPage } from './pages/battle-map-edit/battle-map-edit.page';
import { battleMapResolverById } from './resolvers/battle-map.resolver';

const routes: Routes = [
  {path: "", component: BattleMapPage},
  {path: "new", component: BattleMapEditPage},
  {path: "edit/:id", component: BattleMapEditPage, resolve: {
    battleMap: battleMapResolverById
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleMapRoutingModule { }
