import { ModelScene, GroupObjectTypes, Environment, Geometry } from "https://deno.land.x.remapper@3.1.1/src/mod.ts"

export class laserScene {
    /**
     * @param scene the model scene to add the lasers to
     * @param object the laser that you would like to place (environment or geometry)
     * @method modify the modifications (lightID, lightType, etc.) for your lasers
     * @method matName the name of your material in blender
     * @method push add the lasers to a primary group
     */
    constructor(public scene: ModelScene, public object: GroupObjectTypes) {
        this.sceneName = scene
        this.object = object
    }
    /**pass a variable to modify your laser objects in any way */
    modify(public envMod: (x: Environment | Geometry)) {
        this.mod = envMod
    }
    /**the name of your blender material */
    matName(public name: string) {
        this.mat = name
    }
    /**add the lasers to the primary group */
    push() {
        const laserMats: [] = []
        const obj = this.object
        this.mod(obj)
        for(let i = 1; i <= 1; i++) {
            laserTracks.push(this.mat+`${i}`)
        }
        this.sceneName.addPrimaryGroups(laserMats, obj)
    }
}