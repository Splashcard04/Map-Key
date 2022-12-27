import { Environment, Geometry, GroupObjectTypes, Json, ModelScene } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"
import { logFunctionss } from "./general.ts" 
/**
 * @param object geometry or environment object for your group
 * @param ammount the ammount of the stated object
 * @param scale? the scale of your stated object 
 * @author splashcard__
 */

export class lightGroup {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    amount(ammount: number) {
        this.json.ammount = ammount
    }
    lightID(id: number) {
        this.json.id = id
    }
    lightType(type: number) {
        this.json.type = type
    }
    sceneName(name: ModelScene) {
        const scene = new ModelScene(new Geometry())
        if(name === undefined) {
            let name = scene
        }
        this.json.name = name
    }
    matName(mat: string) {
        this.json.matname = mat
    }
    constructor(object: Geometry | Environment, scale?: [number, number, number], anchor?: [number, number, number]) {
        const lasers = this.json.ammount;
        const laserTracks: string[] = [];
        const laserEnv = object
        if(scale === undefined) {
            const scale = [1, 1, 1]
            this.json.scale = scale
        }
        if(anchor === undefined) {
            const anchor = [0, 0, 0]
            this.json.anchor = anchor
        }
        this.json.scale = scale
        this.json.anchor = anchor

        for (let i = 1; i <= lasers; i++) laserTracks.push(`${this.json.matname}`, `${i}`);

        this.json.sceneName.addPrimaryGroups(
            laserTracks,
            laserEnv,
            this.json.scale,
            this.json.anchor
        );
        if(logFunctionss) {
            console.log(`new lightGroup\nobject: ${object}\nammount: ${this.json.ammount}`)
        }
    }
}
/**
 * add an object to a primaryGroup efficiently
 * @param sceneName the name of your model scene
 * @param matName the name of your material in blender
 * @param object the object to add to your scene primarygroups
 */

export class objectGroup {

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    /**your model scene name */
    sceneName(name: ModelScene) {
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
    constructor(object: GroupObjectTypes, scale?: [number, number, number]) {
        this.json.name.addPrimaryGroups(
            this.json.matNamee,
            object,
            scale
        )
    }
}
