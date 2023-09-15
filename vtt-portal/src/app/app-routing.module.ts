import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'battle-map', loadChildren: ()=> import('./features/battle-map/battle-map.module').then(m => m.BattleMapModule)},
  { path: '**', redirectTo:'battle-map'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
