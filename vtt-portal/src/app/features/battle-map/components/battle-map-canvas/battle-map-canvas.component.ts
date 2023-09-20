import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MouseVelocity } from 'src/app/features/battle-map/models/mouse-velocity.model';

@Component({
  selector: 'app-battle-map-canvas',
  templateUrl: './battle-map-canvas.component.html',
  styleUrls: ['./battle-map-canvas.component.scss']
})
export class BattleMapCanvasComponent {
  @Input() draggable: boolean = true;
  @Output() mouseVelocity: EventEmitter<MouseVelocity> = new EventEmitter<MouseVelocity>();

  @ViewChild('canvas', {read: ElementRef}) canvas: ElementRef | undefined;

  private _drag: boolean = false;
  private _isClicked: boolean = false;

  private _oldX: number = 0;
  private _oldY: number = 0;
  private _zoom: number = 1;

  private _file?: File;

  public get zoom(): number {
    return this._zoom;
  }

  public get file(): File | undefined {
    return this._file;
  }

  fileUrl: string | ArrayBuffer | null = null;

  onFileChange(e: Event){
    let reader = new FileReader();
    const htmlElement = e.target ? (e.target as HTMLInputElement) : null;

    if(htmlElement && htmlElement.files && htmlElement.files.length > 0){
      this._file = htmlElement.files[0];
      reader.readAsDataURL(this._file);
      reader.onload = () => {
        this.fileUrl = reader.result;
      }

    }else{
      return;
    }
  }

  setZoom(newZoom: number) {
    if(this.canvas){
      this._zoom = newZoom;
      this.canvas.nativeElement.style.transform = `scale(${this._zoom})`;
    }
  }

  mouseDownEvent(e: MouseEvent): void {
    this._drag = false;
    this._isClicked = true;

    this._oldX = e.clientX;
    this._oldY = e.clientY
  }

  mouseDragEvent(e: MouseEvent): void {
    this._drag = this._isClicked;
    
    if(this._drag){
      this.mouseVelocity.emit(this.calculateVelocity(e.clientX, e.clientY));
    }
  }

  mouseUpEvent(): void {
    this._drag = this._isClicked = false;
  }

  scrollWheelEvent(e: WheelEvent): void {
    if(this.canvas){
      if(e.deltaY > 0){
        this._zoom = this._zoom - 0.05 <= 0 ? 0.05 : this._zoom - .05;
      }else{
        this._zoom += .05;
      }
      this.canvas.nativeElement.style.transform = `scale(${this._zoom})`;
    }
  }

  private calculateVelocity(x: number, y: number) : MouseVelocity{
    const newVelocity: MouseVelocity = {
      changeX: x - this._oldX,
      changeY: y - this._oldY
    }

    this._oldX = x;
    this._oldY = y;

    return newVelocity;
  }
}
