const { notesBetween, diff } = require(`splashcard_jsmapper`)

module.exports.noteFilterBuilder = class noteFilterBuilder {
    constructor(time = 0, timeEnd = 10) { this.time = time; this.timeEnd = timeEnd }

    positions(pos = [[0, 0]]) { this.positions = pos }
    forNotes(forNote = (n = Note) => Note) { this.forNotes = forNote }

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