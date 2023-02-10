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
    addGroup: Json = {}


    constructor(public name: string, public material: baseGeoMaterial) {}
    /**Import raw material Json. */
    import(json: Json){
        this.material = json as RawGeometryMaterial
        return this
    }

    /**Add the material to the primary group of a modelscene. */
    addPrimaryGroup(addGroup: addGroupSettings) {
        this.addGroup = addGroup
        return this
    }

    /**Add shader keywords with autofill for your material shader.
     * @param keywords The keywords to add. Formatted as {Shader: ["Keyword", "Keyword"]}
    */
    shaderKeywords(keywords: shaderKeywords){
        // A crappy workaround for shaderKeywords being potentially undefined.
        let tempKeywords: string[]
        if(!this.material.shaderKeywords){
            tempKeywords = []
        }
        else{
            tempKeywords = this.material.shaderKeywords
        }
        Object.entries(keywords).forEach(entry =>{
            entry.forEach((word) =>{
                tempKeywords.push(word as string)
            })
        })
        this.material.shaderKeywords = tempKeywords
        return this
    }

    /**Push the material to the active diff (and primary group if applicable). */
    push() {
        activeDiffGet().geoMaterials[this.name] = this.material

        if(logFunctionss) {
            MKLog(`New Geometry Material titled ${this.name}`)
        }

        if(this.addGroup.sceneName) { // sceneName implies addgroup is defined
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