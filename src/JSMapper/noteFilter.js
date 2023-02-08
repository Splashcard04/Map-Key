const { bloqsBetween, diff } = require(`splashcard_jsmapper`)

module.exports.noteFilter = class noteFileter {
    /**
     * filter notes at certain positions
     * @param { Vec2[] } positions the positions to apply custom data to
     * @param { {} } data the customdata to apply to filtered notes
     * @author @Splashcard
     */
    constructor(settings = { time = 0, timeEnd = 10, positions: [[0, 0]], forNotes = (n = Note) => Note }) {
        this.pos = settings.positions
        this.time = settings.time
        this.timeEnd = settings.timeEnd
        this.data = settings.data
        this.forNotes = settings.fornotes
    }
    /**apply changes to notes in the difficulty */
    push() {

        bloqsBetween(this.time, this.timeEnd, n => {
            this.pos.forEach(x => {
                if(n.x == x[0] && n.y == x[1]) {
                    this.forNotes(n)
                }
            })
        })
    }
}