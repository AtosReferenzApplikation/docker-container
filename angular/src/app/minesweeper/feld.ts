export class Feld {

    bomb: boolean;
    aufgedeckt: boolean;
    zahl: number;
    y: number;
    x: number;
    test: string;
  
    constructor(bomb: boolean, aufgedeckt: boolean, y: number, x: number) {
      this.bomb = bomb;
      this.aufgedeckt = aufgedeckt;
      this.y = y;
      this.x = x;
    }
  
       zeileAusgeben2(){
  
    //   let arr2 = [[1, 2, 3],[4, 5, 6,],[7, 8, 9],[10, 11, 12]]
      
    //   for(var i = 0; i < arr2.length; i++) {
    //     let zeile2 = " ";
    //     console.log(" ")
    //     for(var j = 0; j < arr2[i].length; j++) {
    //       zeile2 = zeile2 + arr2[i][j];
    //     }
    //     console.log(zeile2);

    //   }
    //   return zeile2;
      }
  
      zeileAusgeben() {

      // let arr = [[1, 2, 3],[4, 5, 6,],[7, 8, 9],[10, 11, 12]]

      // for(let i in arr){
      //   let zeile = " ";
      //   for(let j in arr[i]){
      //     zeile = zeile + arr[i][j];
      //   }
      //   console.log(zeile);
      // }
    }
  
    erstelleArr() {
  
      // let arr = new Array();
      // for(let i = 0; i < 2; i++) {
      //   let felder1 = new Feld(true, true, 1);
      //   arr[i].push(Feld);
      //   console.log(arr);
      //   for(let j = 0; j < 2; j++) {
  
      //   }
      // }
    }
  
  }