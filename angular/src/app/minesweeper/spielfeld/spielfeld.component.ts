import {Component, OnInit} from '@angular/core';
import {LogikComponent} from '../logik/logik.component';
import {Feld} from '../feld';
import {IfStmt} from '@angular/compiler';

@Component({
  selector: 'app-spielfeld',
  templateUrl: './spielfeld.component.html',
  styleUrls: ['./spielfeld.component.css']
})
export class SpielfeldComponent implements OnInit {

  felder = [];
  ausgewaehltesFeld: string;

  constructor() {
    for (let j = 0; j < 10; j++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        row.push(new Feld(this.isBomb(), false, (j + 1) * -1, i + 1));
      }
      this.felder.push(row);
      console.log(this.felder);
    }
  }

  ngOnInit() {
  }

  aufdecken2(feld: Feld) {

    if (feld.bomb === true) {
      feld.aufgedeckt = true;
    } else {
      feld.aufgedeckt = false;
      feld.test = '+';
    }
  }

  aufdecken(feld: Feld) {

    let bombCounter = 0;

    // for(let x = -1; x <= 1; x++) 
    //   for(let y = -1; y <= 1; y++)
    //     if(this.felder[feld.x+x][feld.y+y].bomb === true) {
    //       feld.zahl = +1;
    //     }
    //       console.log(feld.zahl);


  }

  aufdecken3(feld: Feld) {

    let bombCounter = 0;

    if (feld.x + 1, feld.bomb === true)
      feld.zahl = +1;
    console.log(feld.zahl);
    if (feld.x - 1, feld.bomb === true)
      feld.zahl = +1;
    console.log(feld.zahl);
    if (feld.y + 1, feld.bomb === true)
      feld.zahl = +1;
    if (feld.y - 1, feld.bomb === true)
      feld.zahl = +1;
    if (feld.x + 1, feld.y + 1, feld.bomb === true)
      feld.zahl = +1;
    if (feld.x + 1, feld.y - 1, feld.bomb === true)
      feld.zahl = +1;
    if (feld.x - 1, feld.y + 1, feld.bomb === true)
      feld.zahl = +1;
    if (feld.x - 1, feld.y - 1, feld.bomb === true)
      feld.zahl = +1;

    console.log('Bomgcounter: ' + bombCounter);
    console.log('Feld.zahl: ' + feld.zahl);


  }

  isBomb(): boolean {
    let r = Math.floor((Math.random() * 10) + 1);
    if (r < 4)
      return true;
    return false;
  }
}
