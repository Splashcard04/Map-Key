import { Geometry, GEO_TYPE, Json, ModelScene, activeDiffGet, ColorType, GEO_SHADER, RawGeometryMaterial, copy } from "https://deno.land/x/remapper@3.1.1/src/mod.ts" 
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
    shaderKeywords(keywords: shaderKeywords) {
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
                if(typeof word !== "string"){
                    word.forEach(key =>{
                        tempKeywords.push(key)
                    })
                }
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

export type materialNamingMethods = 
    "Numbered" |
    "By Properties" |
    "Geometry Type Numbered" |
    "Shader Numbered"

/**
 * Converts all identical materials on geometry into a single map-wide material.
 * @param namingMethod Decides the way to name the created materials. Defaults to numbered.
 */
export function optimizeMaterials(namingMethod: materialNamingMethods = "Numbered"){
    activeDiffGet().geometry(arr =>{
        let i = 0;
        arr.forEach(geo =>{
            let copied = false
            if(typeof geo.material !== "string"){
                const mat = copy(geo.material)
                let name: string
                if(namingMethod == "By Properties"){
                    name = `${mat.color?.join()}${mat.shader}${mat.shaderKeywords?.join()}${mat.track}`
                }
                else if(namingMethod == "Geometry Type Numbered"){
                    name = `${geo.type}${i}`
                }
                else if(namingMethod == "Shader Numbered"){
                    name = `${mat.shader}${i}`
                }
                else {
                    name = i.toString()
                }
                geo.material = name
                activeDiffGet().geometry(ray =>{
                    ray.forEach(x =>{
                        const xmat = x.material as RawGeometryMaterial
                        if(mat.shader == xmat.shader && mat.color == xmat.color && mat.shaderKeywords == xmat.shaderKeywords && mat.track == xmat.track){
                            copied = true
                            x.material = name
                        }
                    })
                })
                if(copied){
                    activeDiffGet().geoMaterials[name] = mat;
                    i++
                }
                else{
                    geo.material = mat
                }
            }
        })
    })
}