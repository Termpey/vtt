import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MouseVelocity } from 'src/app/features/battle-map/models/mouse-velocity.model';
import { BattleMapCanvasComponent } from '../../components/battle-map-canvas/battle-map-canvas.component';
import { MapPlacement } from '../../models/map-placement.model';

@Component({
  selector: 'app-battle-map-edit',
  templateUrl: './battle-map-edit.page.html',
  styleUrls: ['./battle-map-edit.page.scss']
})
export class BattleMapEditPage implements OnInit{
  drag: boolean = false;

  @ViewChild('canvasContainer', {read: ElementRef}) canvasContainer: ElementRef | undefined;
  @ViewChild(BattleMapCanvasComponent) canvas: BattleMapCanvasComponent | undefined;

  private _savedPlacement: MapPlacement = {scrollTopRatio: 0, scrollLeftRatio: 0, zoomRatio: 0}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    if(this.canvasContainer != undefined){
      let nativeElement = this.canvasContainer.nativeElement;

      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      this.canvasContainer.nativeElement.scrollTop = nativeElement.children[0].offsetHeight - ((windowHeight * 5) / 2);
      this.canvasContainer.nativeElement.scrollLeft = nativeElement.children[0].offsetWidth + windowWidth;
    }
  }

  dragScrollEvent(change: MouseVelocity): void{
    if(this.canvasContainer != undefined){
      this.canvasContainer.nativeElement.scrollTop -= change.changeY;
      this.canvasContainer.nativeElement.scrollLeft -= change.changeX;
    }
  }

  backToSave(){
    if(this.canvasContainer && this.canvas){
      let scrollTop = this._savedPlacement.scrollTopRatio * window.innerHeight;
      let scrollLeft = this._savedPlacement.scrollLeftRatio * window.innerWidth;
      let zoom = this._savedPlacement.zoomRatio * (window.innerHeight * window.innerWidth);

      this.canvasContainer.nativeElement.scrollTop = scrollTop;
      this.canvasContainer.nativeElement.scrollLeft = scrollLeft;

      console.log(zoom)

      this.canvas.setZoom(zoom);
    }
    
  }

  save(){
    this._savedPlacement = {
      scrollTopRatio: this.canvasContainer?.nativeElement.scrollTop/window.innerHeight,
      scrollLeftRatio: this.canvasContainer?.nativeElement.scrollLeft/window.innerWidth,
      zoomRatio: (this.canvas?.zoom ? this.canvas?.zoom : 0) / (window.innerHeight * window.innerWidth)
    }

    console.log(this.canvas?.zoom)
    console.log(this._savedPlacement)
  }

}
