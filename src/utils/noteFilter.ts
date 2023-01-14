import { notesBetween, Vec2, Note, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { logFunctionss, MKLog } from "./general.ts" 
/**
* filters notes at certain positions
* @param timeStart the time your track will start
* @param timeEnd the duration of your track
* @param positions the position to select
* @author splashcard
*/


export class noteFilter {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

  constructor(timeStart: number, timeEnd: number, positions: Vec2[], forNote: (n: Note) => void) {
    this.json.positions = positions
    notesBetween(timeStart, timeEnd, n => {
      let pass = false;
      this.json.positions.forEach((p: [number, number]) => {
        if (n.x === p[0] && n.y === p[1]) pass = true;
      });
      if (pass) forNote(n);
    });
    if(logFunctionss) {
      MKLog(`Added new Note Filter at ${timeStart} until ${timeEnd}...\nUsing positions: ${this.json.positions}`)
    }
  }
}
