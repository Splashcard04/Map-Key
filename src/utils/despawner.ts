import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

// TODO: add logfunctionss to both classes

export class despawner {
    public lookup?: LOOKUP = "Contains";
    /**
     * A class to aid in the despawning of environment pieces.
     * @param lookup The lookup method to use.
     * @param ids The ids of the pieces to despawn.
     * @author splashcard__
     */
    constructor(lookup?: LOOKUP, public ids?: string[]) {
        this.lookup = lookup;
        this.ids = ids;
    }
    /**
     * After running despawn(), this can restore Environment objects back to [0,0,0] for later use. It cannot restore objects that were despawned using hardDespawn()
     * @param ids The ids of the objects to restore.
     */
    restore(ids: string[]) {
        // Setting objects as `active = true` after running hardDespawn doesn't work sadly.
        ids.forEach(id =>{
            const env = new Environment(id,this.lookup)
            env.position = [0,0,0]
            env.push()
        })
    }
    /**
     * Despawns objects using the `active` property.
     */
    hardDespawn(){
        this.ids?.forEach(id =>{
            const env = new Environment(id,this.lookup)
            env.active = false;
            env.push()
        })
    }
    /**
     * Despawns objects using the `position` property.
     */
    despawn(){
        this.ids?.forEach(id =>{
            const env = new Environment(id,this.lookup)
            env.position = [-69420,-69420,-69420]
            env.push()
        });
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