import { activeDiff, Geometry, GEO_TYPE, Json, RawGeometryMaterial, ModelScene } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
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
     * create a geometry material
     * @param name the name of the created geometry material
     * @param material the material to create
     * @param addGroup add this material to a primary group?
     */

    constructor(public name: string, public material: RawGeometryMaterial, public addGroup?: addGroupSettings) {
        this.name = name
        this.material = material
        this.addGroup = addGroup

        if(logFunctionss) {
            MKLog(`Added new GeoMaterial...\nname: ${name}\nmaterial: ${material}`)
        }


    }
    /**push the material to the difficulty and add a model scene group if selected */
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
