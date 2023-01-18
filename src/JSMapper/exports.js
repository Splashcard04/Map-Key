const { Environment, assignTrackParent, notesBetween, animateTrack, assignPlayerToTrack } = require(`splashcard_jsmapper`)



class despawner {
    /**
     * 
     * @param { string } lookup the lookup for all of the despawned pieces
     * @param { string[] } ids the ids to despawn
     * @param { string[] } hardDespawn the ids to set to active = false
     * @param { string[] } restore the ids to restore from being despawned
     */
    constructor(settings = { lookup: "Contains", ids: [], hardDespawn: [], restore: [] }) {
        this.lookup = settings.lookup
        if(!settings.ids) { this.ids = ["imnotsure"] } else { this.ids = settings.ids }

        if(!settings.hardDespawn) { this.hardDespawn = ["idfk"]} else { this.hardDespawn = settings.hardDespawn }
        if(!settings.restore) { this.restore = ['bruh']} else { this.restore = settings.restore }
    }

    push() {
        this.ids.forEach(id => {
            new Environment({
                id: id,
                lookup: this.lookup,
                position: [-9999, -9999, -9999]
            }).push()
        })

        this.hardDespawn.forEach(id => {
            new Environment({
                id: id,
                lookup: this.lookup,
                active: false
            }).push()
        })

        this.restore.forEach(id => {
            new Environment({
                id: id,
                lookup: this.lookup,
                position: [0, 0, 0],
                active: true
            }).push()
        })
    }
}


class playerAnimation {

    /**
     * animate the player and notes at the same time
     * @param { number } time the time to animate the player
     * @param { number } duration the the duration of the player animation
     * @param { Vec3 animation } position the position to animate the player
     * @param { Vec3 animation } rotation the rotation to animate the player
     * @author @Splashcard04
     */
    constructor(settings = { time: 0, duration: 10, position: [0, 0, 0, 0], rotation: [0, 0, 0]}) {
        this.time = settings.time
        this.duration = settings.duration
        if(settings.position) { this.position = settings.position } else { this.position = [0, 0, 0] }
        if(settings.rotation) { this.rotation = settings.rotation } else { this.rotation = [0, 0, 0] }
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

        new assignPlayerToTrack({
            time: this.time,
            track: "player"
        }).push()

        notesBetween(this.time, timeEnd, {
            "_track": "player"
        })
    }
}