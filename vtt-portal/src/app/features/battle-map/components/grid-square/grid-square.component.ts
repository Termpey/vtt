import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-square',
  templateUrl: './grid-square.component.html',
  styleUrls: ['./grid-square.component.scss']
})
export class GridSquareComponent implements OnInit{
  @Input() withLeft: boolean = false;
  @Input() withTop: boolean = false;

  class: string;

  constructor() {
    this.class = "grid-square ";
  }

  ngOnInit(){
    if(this.withLeft){
      this.class += "with-left ";
    }

    if(this.withTop){
      this.class += "with-top"
    }
  }

}
