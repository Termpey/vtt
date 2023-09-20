import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BattleMap } from '../models/battle-map.model';
import { BattleMapService } from 'src/app/shared/service/battle-map.service';

export const battleMapResolverById: ResolveFn<Observable<BattleMap>> | ResolveFn<BattleMap> = (route, state) => {

  if(route.data['battleMap'] && route.data['battleMap'].id == route.paramMap.get('id')){
    return route.data['battleMap']
  }

  return inject(BattleMapService).getBattleMapByID(Number(route.paramMap.get('id')));
};

export const battleMapResolver: ResolveFn<Observable<BattleMap[]>> = (route, state) => {
  return inject(BattleMapService).getBattleMaps();
};