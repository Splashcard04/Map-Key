import { Environment } from './src/main.ts'
import { mkLog } from '../ReMapper/utils/general.ts'
import { lookup, Json } from './constants.ts'

export class despawner {
    json: Json = {}
            
    import(json: Json) {
        this.json =json
        return this
    }
    constructor(public lookup: lookup, ids: string[]) {
        this.json.lookup = lookup
        this.json.ids = ids
    }

    hardDespawn(ids: string[]) {
        this.json.hardDespawn = ids
    }

    restore(ids: string[]) {
        this.json.restore = ids
    }

    push() {

        if(this.json.ids === undefined) {
            mkLog("parameter `ids` was undefined, ids were infered from general usage", false, true)
            this.json.ids = ["Environment"]
        }

        if(this.json.hardDespawn === undefined) { this.json.hardDespawn = ["this"]}; if(this.json.restore === undefined) { this.json.restore = ["idk"]}

        if(this.json.lookup === "Contains") {
            this.json.ids.forEach(id => {
                new Environment()
                    .contains(id)
                    .position([-9999, -9999, -9999])
                    .push()
            })

            this.json.hardDespawn.forEach(id => {
                new Environment()
                    .contains(id)
                    .active(false)
                    .push()
            })

            this.json.restore.forEach(id => {
                new Environment()
                    .contains(id)
                    .active(true)
                    .position([0, 0, 0])
                    .push()
            })
        }

        if(this.json.lookup = "Regex") {
            this.json.ids.forEach(id => {
                new Environment()
                    .regex(id)
                    .position([-9999, -9999, -9999])
                    .push()
            })

            this.json.hardDespawn.forEach(id => {
                new Environment()
                    .regex(id)
                    .active(false)
                    .push()
            })

            this.json.restore.forEach(id => {
                new Environment()
                    .regex(id)
                    .active(true)
                    .position([0, 0, 0])
                    .push()
            })
        }

        if(this.json.lookup === "Exact") {
            this.json.ids.forEach(id => {
                new Environment()
                    .exact(id)
                    .position([-9999, -9999, -9999])
                    .push()
            })

            this.json.hardDespawn.forEach(id => {
                new Environment()
                    .exact(id)
                    .active(false)
                    .push()
            })

            this.json.restore.forEach(id => {
                new Environment()
                    .exact(id)
                    .active(true)
                    .position([0, 0, 0])
                    .push()
            })
        }
    }
}