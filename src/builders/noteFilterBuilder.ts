import { Note } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { noteFilter } from '../utils/noteFilter.ts'
import { logFunctionss } from '../utils/general.ts'

export type noteFilterbuilderSettings = {
    positions: [number, number][],
    timeStart: number,
    timeEnd: number,
    forNote: (n: Note) => void
}

export class noteFilterBuilder {
    constructor(settings: noteFilterbuilderSettings) {
        /**
        * filters notes at certain positions
        * @param timeStart the time your track will start
        * @param timeEnd the duration of your track
        * @param positions the position to select
        * @author splashcard__ 
        */

    new noteFilter(settings.timeStart, settings.timeEnd, settings.forNote)
    if(logFunctionss) { console.log(`new note filter built at ${settings.timeStart} to ${settings.timeEnd}`)}
    }
}
