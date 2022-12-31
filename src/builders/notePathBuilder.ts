import { Note } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { noteSplit } from '../utils/notePath.ts'
import { logFunctionss } from '../utils/general.ts'

export type notePathSettings = {
    time: number,
    timeEnd: number,
    left: (n: Note) => void,
    right: (n: Note) => void
}

export class notePathBuilder{
    constructor(settings: notePathSettings) {
    /**
     * @param {number} time the time to begin filtering notes
     * @param {number} timeEnd the time to stop filtering notes
     * @param left variable pass for the left notes
     * @param right variable pass for the right notes
     * @author splashcard
     */

    new noteSplit(settings.time, settings.timeEnd, settings.left, settings.right)

    if(logFunctionss) { console.log(`new note split path at ${settings.time} until ${settings.timeEnd}`)}
    }
}
