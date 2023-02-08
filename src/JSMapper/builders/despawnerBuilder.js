const { Environment } = require(`splashcard_jsmapper`)

module.exports.despawnerBuilder = class despawnerBuilder {
    /**
     * despawn environment objects
     * @param { string } lookupMethod the lookup method to use to despwn the objects
     * @method despawn objects to move out of player's sight
     * @method hardDespawn objects to set to active = false
     * @method restore objects to restore from being despawned
     * @method push push the despawned objects to the difficulty
    */

    constructor(lookup = "Contains") { this.lookup = lookup }

    /**move objects out of player's sight */
    despawn(ids = ["string"]) { this.ids = ids }

    /**set objects to active = false */
    hardDespawn(ids = ["string"]) { this.hardDespawn = ids }

    /**restore objects from being despawned */
    resotre(ids = ["string"]) { this.restore = ids }
    
    push() {
        let obj: Environment
        this.ids.forEach(id => {
            obj = new Environment(id, this.lookup)
            obj.position = [-9999, -9999, -9999]
            obj.push
        })

        this.hardDespawn.forEach(id => {
            obj = new Environment(id, this.lookup)
            obj.active = false
            obj.push
        })

        this.restrore.forEach(id => {
            obj = new Environment(id, this.lookup)
            obj.active = true; obj.position = [0, 0, 0]
            obj.push()
        })
    }
}