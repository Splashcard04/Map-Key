import { Geometry, GEO_TYPE, Json, RawGeometryMaterial, ModelScene, activeDiffGet, TrackValue, ColorType, GEO_SHADER } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
import { shaderKeywords } from "../constants.ts"
import { logFunctionss, MKLog } from './general.ts'


export type baseGeoMaterial = {
    shader: GEO_SHADER,
    color?: ColorType,
    shaderKeywords?: shaderKeywords[] | string[],
    track?: TrackValue | string
}

export type addGroupSettings = {
    sceneName: ModelScene
    blenderMatName: string,
    geoType: GEO_TYPE
}

export class _Material {
    /**
     * Creates a new geometry material with shader type and keywords.
     * @param name the name of the created material
     * @param material the material to create
     * @method addGroup add the material to a primary group
     * @method push push the material and a primary group if selected
     */
    json: Json = {}


    constructor(public name: string, public material: baseGeoMaterial) {
        this.name = name; this.material = material
    }

    /**add a primary group with a specific geo type to your scene */
    addGroup(addGroup: addGroupSettings) {
        this.json.addGroup = addGroup
        return this.json
    }

    /**push the material and primary group if selected to the difficulty */
    push() {
        activeDiffGet().geoMaterials[this.name] = this.material

        if(logFunctionss) {
            MKLog(`New Geometry Material titled ${this.name}`)
        }

        if(this.json.addGroup) {
            const scene = this.json.addGroup.sceneName;
            const matName = this.json.addGroup.blenderMatName;
            const geoType = this.json.addGroup.geoType;

            scene.addPrimaryGroups(matName, new Geometry(geoType, this.name))

            if(logFunctionss) {
                const logscene = scene.toString();
                MKLog(`Added a primary group to ${logscene} of material ${this.name}`)
            }
        }
    }
}