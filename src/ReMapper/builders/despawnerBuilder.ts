import { despawner } from '../utils/despawner.ts'
import { LOOKUP, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export type despawnerSettings = {
    lookup: LOOKUP,
    ids: string[],
    hardDespawn?: string[],
    restore?: string[]
}


export class despawnerBuilder {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }
        /**
         * @param {LOOKUP} lookup the lookup method of despawned and restored environment pieces
         * @param {string[]} ids the array of environment ids to despawn
         * @param { string[] } hardDespawn environment pieces to set to active = false
         * @param {string[]} restore environment peices to restore from being despawned
         * @author splashcard
         */

    constructor(settings: despawnerSettings) {

        this.json.lookup = settings.lookup
        this.json.ids = settings.ids
        this.json.hardDespawn = settings.hardDespawn
        this.json.restore = settings.restore
    
    }
    push() {
        new despawner(this.json.lookup, this.json.ids, this.json.hardDespawn, this.json.restore).push();
    }
}

import { advDespawner } from '../utils/despawner.ts'

export type advDespawnSettings = {
    ids: [string[], LOOKUP][], hardDespawn: boolean, restore: [string[], LOOKUP][]
}

export class advDespawnerBuilder {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this;
    }

    constructor(settings: advDespawnSettings) 
    {
        this.json.ids = settings.ids
        this.json.hardDespawn = settings.hardDespawn
        this.json.restore = settings.restore
    }
    push() {
        new advDespawner(this.json.ids, this.json.hardDespawn, this.json.restore).push()
    }
}
