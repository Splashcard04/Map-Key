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

type ids = 
    [[string, LOOKUP]]

export class advDespawner {
    constructor(ids: ids) {
        ids.forEach(id => {
            const env = new Environment(id[0], id[1])
            env.position = [-9999, -9999, -9999];
            env.push();
        })
    }
    hardDespawn(hard: ids) {
        hard.forEach(h => {
            const env = new Environment(h[0], h[1])
            env.active = false
            env.push();
        })
    }
    exclude(excludes: ids) {
        excludes.forEach(ex => {
            const env = new Environment(ex[0], ex[1])
            env.active = true
            env.position = [0, 0, 0]
            env.push();
        })
    }
}
