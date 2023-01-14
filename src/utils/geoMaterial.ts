import { activeDiff, Geometry, GEO_TYPE, Json, RMLog, RawGeometryMaterial, ModelScene } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
import { logFunctionss } from './general.ts'

type addGroupSettings = {
    addGroup: boolean,
    sceneName: ModelScene
    blenderMatName: string,
    geoType: GEO_TYPE
}

export class geoMaterial {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    constructor(public name: string, public material: RawGeometryMaterial, public addGroup?: addGroupSettings) {
        this.name = name
        this.material = material
        this.addGroup = addGroup

        if(logFunctionss) {
            RMLog(`Added new GeoMaterial...\nname: ${name}\nmaterial: ${material}`)
        }


    }

    push() {
        const map = activeDiff

        map.geoMaterials[this.name+"Material"] = this.material

        if(this.addGroup) {
            // if(this.addGroup.scale === undefined) { this.json.scale = [1, 1, 1] } else { this.json.scale = this.addGroup.scale } 
            this.addGroup.sceneName.addPrimaryGroups(
                this.addGroup.blenderMatName,
                new Geometry(this.addGroup.geoType, geoMaterial.name+"Material"),
                // this.json.scale
            )
        }
    }
}
