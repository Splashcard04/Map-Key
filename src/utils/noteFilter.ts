import { notesBetween, Vec2, Note, Json } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
* filters notes at certain positions
* @param timeStart the time your track will start
* @param timeEnd the duration of your track
* @param positions the position to select
* @author splashcard__ <-- bro that guy is like famous
*/


export class noteFilter {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

  positions(positions: Vec2) {
    this.json.positions = positions
  }
  constructor(timeStart: number, timeEnd: number, forNote: (n: Note) => void) {
    notesBetween(timeStart, timeEnd, n => {
      let pass = false;
      this.json.positions.forEach((p: number[]) => {
        if (n.x === p[0] && n.y === p[1]) pass = true;
      });
      if (pass) forNote(n);
    });
  }
}
