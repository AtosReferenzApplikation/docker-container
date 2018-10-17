import {Component, OnInit} from '@angular/core';
import {Feld} from '../feld';

@Component({
  selector: 'app-logik',
  templateUrl: './logik.component.html',
  styleUrls: ['./logik.component.css']
})
export class LogikComponent implements OnInit {

  felder: Feld;
  test = 'string';

  constructor() {

  }


  ngOnInit() {
  }

}








