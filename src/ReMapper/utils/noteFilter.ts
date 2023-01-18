import { Note, activeDiffGet } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { localRotation, NOTE_FILTER_PROPS, rotation } from "../constants.ts"
import { logFunctionss, MKLog } from "./general.ts" 
// /**
// * filters notes at certain positions
// * @param timeStart the time your track will start
// * @param timeEnd the duration of your track
// * @param positions the position to select
// * @author splashcard
// */

// // export class noteFilter {

// //     json: Json = {}

// //     import(json: Json) {
// //         this.json = json
// //         return this
// //     }

// //   constructor(timeStart: number, timeEnd: number, positions: Vec2[], forNote: (n: Note) => void) {
// //     this.json.positions = positions
// //     notesBetween(timeStart, timeEnd, n => {
// //       let pass = false;
// //       this.json.positions.forEach((p: [number, number]) => {
// //         if (n.x === p[0] && n.y === p[1]) pass = true;
// //       });
// //       if (pass) forNote(n);
// //     });
// //     if(logFunctionss) {
// //       MKLog(`Added new Note Filter at ${timeStart} until ${timeEnd}...\nUsing positions: ${this.json.positions}`)
// //     }
// //   }
// // }

// Reworking this to be similar to the env and geo filters.

/**
 * Works like notesBetween. Except it searches for notes based on a specific note property.
 * @param property The property to check for on each note. This can either be an auto-fill property like "position", or it can be one of the available enums (like rotation.x).
 * @param value The value that the property must be to pass.
 * @param forEach What to execute for each note that passes.
 * @author Aurellis
 */
export function filterNotes(property: NOTE_FILTER_PROPS | rotation | localRotation, value: number[] | string | number | boolean, forEach: (x: Note) => void){
  let count = 0;
  if(property == "fake" && value == true){
    activeDiffGet().fakeNotes.forEach((n: Note) =>{
      forEach(n);
      count++
    })
  }
  if(property == "track"){
    activeDiffGet().notes.forEach((n: Note) =>{
      if(n.track.has(value.toString())){
        forEach(n)
        count++
      }
    })
  }
  else {
    activeDiffGet().notes.forEach((n: Note) =>{
      if(eval(`n.${property}.toString()`) == value.toString()){
        forEach(n)
        count++
      }
    })
  }
  if(logFunctionss){
    MKLog(`Filtered ${activeDiffGet().fakeNotes.length+activeDiffGet().notes.length} notes for any with a ${property} property of ${value}...\nobjects found: ${count}`)
  }
}