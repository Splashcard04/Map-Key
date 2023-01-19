const { notesBetween, diff } = require(`splashcard_jsmapper`)

module.exports.noteFilter = class noteFileter {
    /**
     * filter notes at certain positions
     * @param { Vec2[] } positions the positions to apply custom data to
     * @param { {} } data the customdata to apply to filtered notes
     * @author @Splashcard
     */
    constructor(settings = {positions: [[0, 0]], data: {}}) {
        this.pos = settings.positions
        this.data = settings.data
    }

    push() {
        diff.colorNotes.forEach(n => {
            this.pos.forEach(x => {
                if(n.customData.coordinates === x || n.x === x[0] && n.y === x[1]) {
                    n.customData = n.customData + this.data
                }
            })
        })

        diff.customData.fakeColorNotes.forEach(n => {
            this.pos.forEach(x => {
                if(n.customData.coordinates === x || n.x === x[0] && n.y === x[1]) {
                    n.customData = n.customData + this.data
                }
            })
        })
    }
}