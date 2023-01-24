import { addGroupSettings, geoMaterial } from '../utils/GeoMaterial.ts'
import { Json, RawGeometryMaterial } from 'https://deno.land/x/remapper@3.1.1/src/mod.ts'

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
    }
}
