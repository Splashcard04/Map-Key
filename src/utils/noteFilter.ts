import { notesBetween, Vec2, Note } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
* filters notes at certain positions
* @param timeStart the time your track will start
* @param timeEnd the duration of your track
* @param positions the position to select
* @author splashcard__ <-- bro that guy is like famous
*/


export class noteFilter {
  positions(positions: Vec2[]) {
    this.positions = positions
  }
  constructor(timeStart: number, timeEnd: number, forNote: (n: Note) => void) {
    notesBetween(timeStart, timeEnd, n => {
      let pass = false;
      this.positions.forEach(p => {
        if (n.x === p[0] && n.y === p[1]) pass = true;
      });
      if (pass) forNote(n);
    });
  }
}