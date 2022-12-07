import { activeDiff, GeometryMaterial, Geometry, GEO_TYPE } from "https://deno.land/x/remapper@3.0.0/src/mod.ts" 

type addGroupSettings = {
    addGroup: boolean,
    // deno-lint-ignore no-explicit-any
    sceneName: any
    matName: string,
    geoType: GEO_TYPE
}

export class geoMaterail {
    constructor(name: string, material: GeometryMaterial) {
        const map = activeDiff
        
        map.geoMaterials[name+"Material"] = material


    }
    addGroup(addGroup: addGroupSettings) {
        if(addGroup?.addGroup === true) {
            addGroup.sceneName.addPrimaryGroups(
                addGroup.matName,
                new Geometry(addGroup.geoType, geoMaterail.name+"Material")
            )
        }
    }
}