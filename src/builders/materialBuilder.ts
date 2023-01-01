import { geoMaterial, addGroupSettings, Json } from '../utils/geoMaterial.ts'
import { logFunctionss } from '../utils/general.ts'
import { RawGeometryMaterial, ModelScene, GEO_TYPE } from 'https://deno.land/x/remapper@3.1.1/src/mod.ts'

export type matBuilderSettings = {
    name: string,
    material: RawGeometryMaterial,
    addGroup?: addGroupSettings
}

export class geoMatBuilder {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    constructor(settings: matBuilderSettings) {
        this.json.name = settings.name
        this.json.mat = settings.material
        this.json.addGroup = settings.addGroup
    }

    push() {
        new geoMaterial(this.json.name, this.json.mat, this.json.addGroup).push()

        if(logFunctionss) {
            console.log(`new geometry material called ${this.json.name}`)
        }
    }
}
