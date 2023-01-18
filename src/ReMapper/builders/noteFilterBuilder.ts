import { Note, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { noteFilter } from '../utils/noteFilter.ts'

export type noteFilterbuilderSettings = {
    positions: [number, number][],
    timeStart: number,
    timeEnd: number,
    forNote: (n: Note) => void
}

export class noteFilterBuilder {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }
    constructor(settings: noteFilterbuilderSettings) {
        /**
        * filters notes at certain positions
        * @param timeStart the time your track will start
        * @param timeEnd the duration of your track
        * @param positions the position to select
        * @author splashcard__ 
        */

    this.json.positions = settings.positions
    this.json.timeStart = settings.timeStart
    this.json.timeEnd = settings.timeEnd
    this.json.forNote = settings.forNote

    
    }
    push() {
        new noteFilter(this.json.timeStart, this.json.timeEnd, this.json.positions, this.json.forNote)
    }
}
