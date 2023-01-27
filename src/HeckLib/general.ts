import { Note, activeOutput } from "./src/main.ts";

export function notesBetween(time: number, timeEnd: number, forNote: (n: Note) => void) {
    JSON.parse(Deno.readTextFileSync(activeOutput)).colorNotes.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forNote(x)
        }
    })
}
