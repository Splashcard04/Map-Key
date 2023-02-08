const { notesBetween, diff } = require(`splashcard_jsmapper`)

module.exports.noteFilterBuilder = class noteFilterBuilder {
    /**
     * filter notes based on position
     * @param { number } time the time to start applying changes to notes
     * @param { number } timeEnd the time to stop applying changes to notes
     * @method positions the positions to filter notes with
     * @method forNotes modification to filtered notes
     * @method push add the custom data to filtered notes
     */
    constructor(time = 0, timeEnd = 10) { this.time = time; this.timeEnd = timeEnd }

    /**the positions to apply custom data to notes in */
    positions(pos = [[0, 0]]) { this.positions = pos }

    /**the modifications to apply to notes */
    forNotes(forNote = (n = Note) => Note) { this.forNotes = forNote }


    /**push the modifications to filtered notes in the difficulty */
    push() {
        notesBetween(this.time, this.timeEnd, n => {
            this.pos.forEach(x => {
                if(n.x == x[0] && n.y = x[1]) {
                    this.forNote(n)
                }
            })
        })
    }
}