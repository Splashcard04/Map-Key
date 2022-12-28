import { activeDiff, GeometryMaterial, Geometry, GEO_TYPE, Vec3, Json, RMLog } from "https://deno.land/x/remapper@3.0.0/src/mod.ts" 
import { logFunctionss } from './general.ts'
type addGroupSettings = {
    // deno-lint-ignore no-explicit-any
    sceneName: any
    blenderMatName: string,
    geoType: GEO_TYPE,
    scale?: Vec3
}

export class geoMaterial {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    constructor(name: string, material: GeometryMaterial) {
        const map = activeDiff
        
        map.geoMaterials[name+"Material"] = material

        if(logFunctionss) {
            RMLog(`Added new GeoMaterial...\nname: ${name}\nmaterial: ${material}`)
        }
    }
  
    addGroup(addGroup: addGroupSettings) {
        if(addGroup.scale == undefined) { this.json.scale = [1, 1, 1]} else { this.json.scale = addGroup.scale}
        addGroup.sceneName.addPrimaryGroups(
            addGroup.blenderMatName,
            new Geometry(addGroup.geoType, geoMaterial.name+"Material"),
            this.json.scale
        )
    }



}
