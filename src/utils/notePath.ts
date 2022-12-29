import { notesBetween, Note, Json, RMLog } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { logFunctionss } from "./general.ts" 
 /**
 * @param timeStart the time to start applying the custom data to the notes
 * @param timeEnd the time to stop applying custom data to the notes
 * @param forNoteL pass for all left notes
 * @param fornoteR pass for all right notes
 * @author splashcard__ 
 */

export class noteSplit {

  json: Json = {}

  import(json: Json) {
      this.json = json
      return this
  }
  constructor(time: number, timeEnd: number) {
    this.json.time = time;
    this.json.timeEnd = timeEnd;
    if(logFunctionss) {
      RMLog(`Added new split note path at ${time} ending at ${timeEnd}...`)
    }
  }
  left(forNoteL: (n: Note) => void) {
    notesBetween(this.json.time, this.json.timeEnd, n => {
      let pass = false;
      if(n.type === 0) { pass = true } else { pass = false }
      if (pass) forNoteL(n);
    });
  }
  right(forNoteR: (n: Note) => void) {
    notesBetween(this.json.time, this.json.timeEnd, n => {
      let pass = false;
      if(n.type === 1) { pass = true } else { pass = false }
      if (pass) forNoteR(n);
    });
  }
}
