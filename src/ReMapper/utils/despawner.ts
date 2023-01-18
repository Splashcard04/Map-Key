import { logFunctionss, MKLog } from "./general.ts"
import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class despawner {

    constructor(public lookup: LOOKUP, public ids: string[], public restore?: string[], public hardDespawn?: string[]) {
        this.lookup = lookup
        this.ids = ids
        this.restore = restore
        this.hardDespawn = hardDespawn
    }

    push() {
        this.ids.forEach(id => {
            const env = new Environment(id, this.lookup)
            env.position = [-9999, -9999, -9999]
            env.push();
        })
        this.hardDespawn?.forEach(hd => {
            const env = new Environment(hd, this.lookup)
            env.active = false
            env.push();
        })
        this.restore?.forEach(res => {
            const env = new Environment(res, this.lookup)
            env.position = [0, 0, 0]
            env.active = true
            env.push();
        })
        if(logFunctionss) { MKLog(`New despawner using ${this.lookup} created.\nDespawning ${this.ids.length} environments...`)}
    }
}

// Goofy af despawner that has a cursed id syntax rn

export class advDespawner {
    /**
     * A class to aid in the despawning of multiple objects using differnt lookup methods.
     * @param ids The ids and lookups to use. Written as [["lookup", ["id", "id"]], ["lookup", ["id", "id"]] etc...]
     * @param hardDespawn If true, despawns the object using the `active` property rather than `position`, restore will not work if this is used.
     * @param restore Any ids to restore after despawning, this will not work if hardDespawn is used. Ids are again written as [["lookup", ["id", "id"]]etc...]
     * @author Aurellis
     */
    constructor(public ids: [string[], LOOKUP][] = [], public hardDespawn: boolean = false, public restore: [string[], LOOKUP][] | undefined = undefined) {} // Empty constructor wooooo!

    push() {
        this.ids.forEach(lookupgroups => {
            // lookupgroups = [[id, id], lookup]
            const env = new Environment("",lookupgroups[1])
            lookupgroups.forEach(id =>{
                // id = "lookup" || ["id", "id"]
                if(typeof(id) !== "string"){
                    id.forEach(x =>{
                        // x = "id"
                        env.id = x;
                        if(this.hardDespawn){
                            env.active = false
                        }
                        else{
                            env.position = [-9999, -9999, -9999]
                        }
                        env.push();
                    })
                }
            })
        })
        if(this.restore){
            this.restore.forEach(lookupgroups => {
                const env = new Environment("",lookupgroups[1])
                lookupgroups.forEach(id =>{
                    if(typeof(id) !== "string"){
                        id.forEach(x =>{
                            env.id = x;
                            env.position = [0,0,0];
                            env.active = true;
                            env.push()
                        })
                    }
                })
            })
        }
        if(logFunctionss) { MKLog(`New advanced despawner with ${this.ids[2]} lookup added...`)}
    }
}
