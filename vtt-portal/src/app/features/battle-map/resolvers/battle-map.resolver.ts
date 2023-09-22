import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BattleMap } from '../models/battle-map.model';
import { BattleMapService } from 'src/app/shared/service/battle-map.service';
import { DataService } from 'src/app/shared/service/data.service';

export const battleMapResolverById: ResolveFn<Observable<BattleMap>> | ResolveFn<BattleMap> = (route, state) => {
  const data = inject(DataService).CurrentBattleMap;

  if(data != undefined && data.id == Number(route.paramMap.get('id'))){
    return data;
  }

  return inject(BattleMapService).getBattleMapByID(Number(route.paramMap.get('id')));
};

export const battleMapResolver: ResolveFn<Observable<BattleMap[]>> = (route, state) => {
  return inject(BattleMapService).getBattleMaps();
};