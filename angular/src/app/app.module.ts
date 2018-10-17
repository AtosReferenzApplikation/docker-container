import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MinesweeperComponent} from './minesweeper/minesweeper.component';
import {SpielfeldComponent} from './minesweeper/spielfeld/spielfeld.component';
import {LogikComponent} from './minesweeper/logik/logik.component';


@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    SpielfeldComponent,
    LogikComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
