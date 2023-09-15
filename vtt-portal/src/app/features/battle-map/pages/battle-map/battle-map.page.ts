import { Component } from '@angular/core';

@Component({
  selector: 'app-battle-map',
  templateUrl: './battle-map.page.html',
  styleUrls: ['./battle-map.page.scss']
})
export class BattleMapPage {
  rows: number = 25;
  columns: number = 10;

  fileUrl: string | ArrayBuffer  | null = "";

  editRows(change: number){
    if(this.rows + change >= 1){
      this.rows += change;
    }
  }

  editColumns(change: number){
    if(this.columns + change >= 1){
      this.columns += change;
    }
  }

  onFileChange(e: Event){
    let reader = new FileReader();
    const htmlElement = e.target ? (e.target as HTMLInputElement) : null;

    if(htmlElement && htmlElement.files && htmlElement.files.length > 0){
      let file = htmlElement.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileUrl = reader.result;
      }

    }else{
      return;
    }
  }
}
