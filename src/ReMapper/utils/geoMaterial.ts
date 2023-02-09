import { Geometry, GEO_TYPE, Json, ModelScene, activeDiffGet, ColorType, GEO_SHADER, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
import { shaderKeywords } from "../constants.ts"
import { logFunctionss, MKLog } from './general.ts'


export type baseGeoMaterial = {
    shader: GEO_SHADER,
    color?: ColorType,
    shaderKeywords?: string[]
}

export type addGroupSettings = {
    sceneName: ModelScene
    blenderMatName: string,
    geoType: GEO_TYPE
}

export class Material {
    /**
     * Creates a new geometry material with shader type and keywords.
     * @param name The name of your material.
     * @param material The material to create.
     */
    json: Json = {}
    addGroup: Json = {}


    constructor(public name: string, material: baseGeoMaterial) {
        this.json = material
    }
    /**Import raw material Json. */
    import(json: Json){
        this.json = json
        return this
    }

    /**Add the material to the primary group of a modelscene. */
    addPrimaryGroup(addGroup: addGroupSettings) {
        this.addGroup = addGroup
        return this
    }

    /**Add shader keywords with autofill for your material shader. */
    shaderKeywords(keywords: shaderKeywords){
        Object.entries(keywords).forEach(entry =>{
            entry.forEach(word =>{
                this.json.shaderKeywords.push(word)
            })
        })
    }

    /**Push the material to the active diff (and primary group if applicable). */
    push() {
        activeDiffGet().geoMaterials[this.name] = this.json as RawGeometryMaterial

        if(logFunctionss) {
            MKLog(`New Geometry Material titled ${this.name}`)
        }

        if(this.json.addGroup) {
            const scene = this.addGroup.sceneName;
            const matName = this.addGroup.blenderMatName;
            const geoType = this.addGroup.geoType;

            scene.addPrimaryGroups(matName, new Geometry(geoType, this.name))

            if(logFunctionss) {
                const logscene = scene.toString();
                MKLog(`Added a primary group to ${logscene} of material ${this.name}`)
            }
        }
    }
}