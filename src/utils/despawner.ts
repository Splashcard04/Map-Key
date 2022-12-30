import { logFunctionss } from "./general.ts"
import { Environment, LOOKUP, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class despawner {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

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
        if(logFunctionss) { console.log(`new despawner using ${this.lookup}`)}
    }
}