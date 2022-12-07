import { notesBetween, Note } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

 /**
 * @param timeStart the time to start applying the custom data to the notes
 * @param timeEnd the time to stop applying custom data to the notes
 * @param forNoteL pass for all left notes
 * @param fornoteR pass for all right notes
 * @author splashcard__ 
 */

export class noteAnim {
   constructor(timeStart: number, timeEnd: number, forNoteL: (n: Note) => void,  forNoteR: (n: Note) => void) {
       notesBetween(timeStart, timeEnd, n => {
           let pass = false;
           if(n.type === 0) { pass = true } else { pass = false }
           if (pass) forNoteL(n);
         });
        
         notesBetween(timeStart, timeEnd, n => {
           let pass = false;
           if(n.type === 1) { pass = true } else { pass = false }
           if (pass) forNoteR(n);
         });
   }

}