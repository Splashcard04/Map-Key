import { groupObjectTypes, json } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
 * @param object geometry or environment object for your group
 * @param ammount the ammount of the stated object
 * @param scale? the scale of your stated object 
 */

export class lightGroup {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    /**the minimum light id of your laser group, suggested intervals of 100 of multiple groups */
    lightIDMin(id: number) {
        this.json.lightID = lightID
    }
    /**the light type for your laser group to be lit with */
    lightType(type: number) {
        this.json.lightType = type
    }
    /** the name of your model scene */
    sceneName(name: any) {
        this.json.sceneName = name
    }
    /**the nae of your laser material in blender */
    matName(matName: string) {
        this.json.matName = matname
    }
    constructor(object: groupObjectTypes, ammount: number, scale?: [number, number, number]) {
        const objTracks: string[] = [];
        const sceneObj = environment;
        const sceneName = this.json.sceneName
        sceneObj.lightID = this.json.lightID
        sceneObj.lightType = this.json.lightType

        for (let i = 1; i <= ammount; i++) objTracks.push(this.json.matName + `${i}`);
        sceneName.addPrimaryGroups(objTracks, sceneObj, scale)
    }
}

/**
 * add an object to a primaryGroup efficiently
 * @param sceneName the name of your model scene
 * @param matName the name of your material in blender
 * @param object the object to add to your scene primarygroups
 */

export class objectGroup {
    /**your model scene name */
    sceneName(name: any) {
        this.json.name = name
    }
    /** the name of your material in blender */
    matName(name: string) {
        this.json.matNamee = name
    }
    /**
     * @param object your primary group object to add   
     * @param scale the scale offset of your object
     */
    constructor(object: groupObjectTypes, scale?: [number, number, number]) {
        sceneName.addPrimaryGroups(
            this.json.matNamee,
            object,
            scale
        )
    }
}
