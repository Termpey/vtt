import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MouseVelocity } from 'src/app/features/battle-map/models/mouse-velocity.model';
import { BattleMapCanvasComponent } from '../../components/battle-map-canvas/battle-map-canvas.component';
import { BattleMap, NewBattleMap } from '../../models/battle-map.model';
import { BattleMapService } from 'src/app/shared/service/battle-map.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-battle-map-edit',
  templateUrl: './battle-map-edit.page.html',
  styleUrls: ['./battle-map-edit.page.scss']
})
export class BattleMapEditPage implements OnInit{
  drag: boolean = false;

  @ViewChild('canvasContainer', {read: ElementRef}) canvasContainer: ElementRef | undefined;
  @ViewChild(BattleMapCanvasComponent) canvas: BattleMapCanvasComponent | undefined;

  private _newMap?: NewBattleMap;
  private _curMap?: BattleMap;
  private _mode: 'edit' | 'new';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private battleMapService: BattleMapService, private dataService: DataService){
    if(this.router.url.includes('new')){
      this._mode = 'new'
    }else{
      this._mode = 'edit'
    }
  }

  ngOnInit(): void {
    if(this._mode == 'edit'){
      this.activatedRoute.data.subscribe(({ battleMap }) => {
        this._curMap, this.dataService.CurrentBattleMap = battleMap;
      });
    }
  }

  ngAfterViewInit(): void {
    if(this.canvasContainer != undefined){
      if(this._mode == 'new'){
        let nativeElement = this.canvasContainer.nativeElement;

        this.canvasContainer.nativeElement.scrollTop = nativeElement.children[0].offsetHeight - ((window.innerHeight * 5) / 2);
        this.canvasContainer.nativeElement.scrollLeft = nativeElement.children[0].offsetWidth + window.innerWidth;
      }else if(this._curMap && this.canvas){
        let scrollTop = this._curMap.scrollTopRatio * window.innerHeight;
        let scrollLeft = this._curMap.scrollLeftRatio * window.innerWidth;
        let zoom = this._curMap.zoomRatio * (window.innerHeight * window.innerWidth);

        this.canvasContainer.nativeElement.scrollTop = scrollTop;
        this.canvasContainer.nativeElement.scrollLeft = scrollLeft;

        this.canvas.setZoom(zoom);
        }
    }
  }

  dragScrollEvent(change: MouseVelocity): void{
    if(this.canvasContainer != undefined){
      this.canvasContainer.nativeElement.scrollTop -= change.changeY;
      this.canvasContainer.nativeElement.scrollLeft -= change.changeX;
    }
  }

  save(){
    if(this.canvas && this.canvas.file != undefined){
      this._newMap = {
        file: this.canvas.file,
        name: "Temp",
        scrollTopRatio: (this.canvasContainer?.nativeElement.scrollTop/window.innerHeight).toString(),
        scrollLeftRatio: (this.canvasContainer?.nativeElement.scrollLeft/window.innerWidth).toString(),
        zoomRatio: ((this.canvas?.zoom ? this.canvas?.zoom : 0) / (window.innerHeight * window.innerWidth)).toString()
      }

      this.battleMapService.newBattleMap(this._newMap).subscribe(result => {
        this.dataService.CurrentBattleMap = result;
        this.router.navigate([`battle-map/edit/${result.id}`])
      });
    }
  }

}
