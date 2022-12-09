import { activeDiff, GeometryMaterial, Geometry, GEO_TYPE, Vec3 } from "https://deno.land/x/remapper@3.0.0/src/mod.ts" 

type addGroupSettings = {
    // deno-lint-ignore no-explicit-any
    sceneName: any
    blenderMatName: string,
    geoType: GEO_TYPE,
    scale?: Vec3
}

export class geoMaterail {
    constructor(name: string, material: GeometryMaterial) {
        const map = activeDiff
        
        map.geoMaterials[name+"Material"] = material


    }
    addGroup(addGroup: addGroupSettings) {
        if(addGroupSettings.scale == undefined) { this.json.scale = [1, 1, 1]} else { this.json.scale = addGroupSettings.scale}
        addGroup.sceneName.addPrimaryGroups(
            addGroup.blenderMatName,
            new Geometry(addGroup.geoType, geoMaterail.name+"Material"),
            this.json.scale
        )
    }
}