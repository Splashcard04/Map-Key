const {  animateTrack, assignTrackParent, assignPlayerToTrack, notesBetween } = require(`splashcard_jsmapper`)

class playerAnimation {

    /**
     * animate the player and notes at the same time
     * @param { number } time the time to animate the player
     * @param { number } duration the the duration of the player animation
     * @param { Vec3 animation } position the position to animate the player
     * @param { Vec3 animation } rotation the rotation to animate the player
     * @author @Splashcard04
     */
    constructor(settings = { time: 0, 
        duration: 10, 
        position: [0, 0, 0, 0], 
        rotation: [0, 0, 0], 
        playerTrack: "bruh", 
        noteTrack: "idk"
        }) 
        {
        this.time = settings.time
        this.duration = settings.duration
        if(settings.position) { this.position = settings.position } else { 
            this.position = [0, 0, 0]
            MKLog("parameter `position` was undefined, value has been reverted to 0, 0, 0", false, true)
        }
        if(settings.rotation) { this.rotation = settings.rotation } else { this.rotation = [0, 0, 0] }
        this.playerTrack = settings.playerTrack
        this.noteTrack = settings.noteTrack
    }

    push() {
        const timeEnd = this.time + this.duration
        new animateTrack({
            time: this.time,
            duration: this.duration,
            animatePosition: this.position,
            animateRotation: this.rotation,
            track: "player"
        }).push()

        new assignTrackParent({
            time: this.time,
            childTracks: ["notes"],
            parentTrack: "player"
        }).push()

        if(!this.playerTrack || this.playerTrack === undefined) {
            new assignPlayerToTrack({
                time: this.time,
                track: "player"
            }).push()
        } else {
            new assignPlayerToTrack({
                time: this.time,
                track: "player"
            }).push()

            new assignPlayerToTrack({
                time: this.time,
                track: this.playerTrack
            })
        }

        if(!this.noteTrack || this.noteTrack === undefined) {
            notesBetween(this.time, timeEnd, {
                "_track": "notes"
            })
        } else {
            notesBetween(this.time, timeEnd, {
                "_track": [
                    notes,
                    this.noteTrack
                ]
            })
        }
    }
}

module.exports = {
    playerAnimation: playerAnimation
}