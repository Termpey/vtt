import { Injectable } from '@angular/core';
import { BattleMap } from 'src/app/features/battle-map/models/battle-map.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _currentBattleMap?: BattleMap;

  public get CurrentBattleMap(): BattleMap | undefined {
    return this._currentBattleMap;
  }

  public set CurrentBattleMap(setMe: BattleMap | undefined) {
    this._currentBattleMap = setMe;
  }

  constructor() { }
}
