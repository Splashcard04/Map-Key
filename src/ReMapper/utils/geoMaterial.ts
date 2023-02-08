import { Geometry, GEO_TYPE, Json, RawGeometryMaterial, ModelScene, activeDiffGet } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
import { logFunctionss, MKLog } from './general.ts'

export type addGroupSettings = {
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

    /**
     * Create a geometry material.
     * @param name The name of the created geometry material.
     * @param material The material to create.
     * @param addGroup Add this material to a primary group?
     */

    constructor(public name: string, public material: RawGeometryMaterial, public addGroup?: addGroupSettings) {
        this.name = name
        this.material = material
        this.addGroup = addGroup

        if(logFunctionss) {
            MKLog(`Added new GeoMaterial...\nname: ${name}\nmaterial: ${material}`)
        }


    }
    /**Push the material to the difficulty and add a model scene group if selected.*/
    push() {
        activeDiffGet().geoMaterials[this.name] = this.material

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
