import { Geometry, GEO_TYPE, Json, RawGeometryMaterial, ModelScene, activeDiffGet, ColorType, GEO_SHADER } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
import { shaderKeywords } from "../constants.ts"
import { logFunctionss, MKLog } from './general.ts'

export type addGroupSettings = {
    addGroup: boolean,
    sceneName: ModelScene
    blenderMatName: string,
    geoType: GEO_TYPE
}

export class Material {
    json: Json = {}
    /**
     * Creates a new material with shader type and keywords.
     * @param name The name of the material.
     * @param shader The shader type.
     * @param color The color of the material.
     */
    constructor(public name: string, shader: GEO_SHADER, color?: ColorType){
        this.json.shader = shader;
        this.json.color = color;
    }
    /**
     * Add shader keywords to the material.
     * @param _words The keywords to add. Written like {shadertype: ["keyword", "keyword", etc...]}.
     */
    shaderKeywords(_words: shaderKeywords){
        this.json.shaderKeywords = eval(`_words.${this.json.shader}`)
        return this
    }
    /**
     * Manually import material json.
     * @param json The raw JSON to import.
     */
    import(json: Json){
        this.json = json;
        return this
    }
    /**
     * Add the material to a modelscene.
     * @param settings The settings for adding to the scene.
     */
    addGroup(settings: addGroupSettings){
        settings.sceneName.addPrimaryGroups(
            settings.blenderMatName,
            new Geometry(settings.geoType, this.name)
        )
        if(logFunctionss){
            MKLog(`Added material ${this.name} to scene ${settings.sceneName}...`)
        }
    }
    /**
     * Push the material to the diff.
     */
    push(){
        activeDiffGet().geoMaterials[this.name] = this.json as RawGeometryMaterial
        if(logFunctionss){
            MKLog(`Created new material ${this.name} to the active diff...`)
        }
    }
}