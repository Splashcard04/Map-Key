import { Environment, LOOKUP, Json } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

export class despawner {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }
    constructor(lookup?: LOOKUP, ids?: string[]) {
        if(lookup == undefined) { this.json.lookup = "Contains" } else { this.json.lookup = lookup}
        if(ids !== undefined) {
            this.json.ids = ids
            ids.forEach(id => {
                const env = new Environment(id, this.json.lookup)
                env.position = [-9999, -9999, -9999]
                env.push();
            })
        } else {
            const env = new Environment("Environment", this.json.lookup)
            env.position = [-9999, -9999, -9999]
            env.push();
        }

    }
    excludes(ids: string[]) {
        ids.forEach(id => {
            const env = new Environment(id, this.json.lookup)
            env.position = [0, 0, 0]
            env.push();
        })
    }
    hardDespawn() {
        this.json.ids.forEach((id: string) => {
            const env = new Environment(id, this.json.lookup)
            env.active = false
            env.push();
        })
    }
}

export class advDespawner {
    /**
     * A class to aid in the despawning of objects. Handles each object separately with per-object lookup.
     * @param ids The objects to despawn, and the lookup to use for each object.
     * @example new advDespawner([["Environment","Contains"],["PlayersPlace$","Regex"]]);
     * @author splashcard__
     */
    constructor(public ids: [string, LOOKUP][]) {
        this.ids = ids;
        ids.forEach(id => {
            const env = new Environment(id[0], id[1])
            env.position = [-69420, -69420, -69420];
            env.push();
        })
    }
    /**
     * Sets the objects as `"_active": false` on top of changing their position.
     * Useful for objects that don't respond to a position value.
     */
    hardDespawn() {
        this.ids.forEach(id => {
            const env = new Environment(id[0], id[1])
            env.active = false
            env.push();
        })
    }
    /**
     * The ids to exclude from despawning. Sets their position to [0,0,0] and active to true.
     * If hardDespawn is used, this will need to be executed after, or it won't work.
     * @param excludes The ids to exclude. Uses the same format as when the class is initialized.
     */
    exclude(excludes: [string,LOOKUP][]) {
        excludes.forEach(ex => {
            const env = new Environment(ex[0], ex[1])
            env.active = true
            env.position = [0, 0, 0]
            env.push();
        })
    }
}