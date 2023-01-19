const { Environment } = require(`splashcard_jsmapper`)



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

module.exports = {
    despawner: despawner
}