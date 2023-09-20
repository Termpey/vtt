import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';

import { BattleMap, NewBattleMap } from 'src/app/features/battle-map/models/battle-map.model';

import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleMapService {

  private _urlGroup: string = "/user-maps/battle-maps";

  constructor(private httpClient: HttpClient ) {}

  public newBattleMap(battleMap: NewBattleMap): Observable<BattleMap> {
    let payload: FormData = new FormData(); //This call requires a multipart request

    let key: keyof NewBattleMap;

    for(key in battleMap){  //Dynamically setup form data object, including the file
      payload.append(key, battleMap[key]);
    }

    return this.httpClient.post<BattleMap>(this.URLBase + '', payload);
  }

  public updateBattleMap(battleMap: BattleMap): Observable<BattleMap> {
    return this.httpClient.put<BattleMap>(this.URLBase, battleMap);
  }

  public deleteBattleMap(id: number): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.URLBase + `/${id}`);
  } 

  public getBattleMapByID(id: number): Observable<BattleMap> {
    return this.httpClient.get<BattleMap>(this.URLBase + `/${id}`);
  }

  public getBattleMaps(): Observable<BattleMap[]>{
    return this.httpClient.get<BattleMap[]>(this.URLBase);
  }

  private get URLBase(): string {
    return environment.API_BASE_URL + this._urlGroup
  }
}
