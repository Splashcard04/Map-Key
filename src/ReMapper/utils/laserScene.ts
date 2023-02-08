import { ModelScene, GroupObjectTypes, Environment, Geometry, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class laserScene {
    json: Json = {};
    import(json: Json) {
        this.json = json
        return this
    }
    /**
     * @param scene the model scene to add the lasers to
     * @param object the laser that you would like to place (environment or geometry)
     * @method modify the modifications (lightID, lightType, etc.) for your lasers
     * @method matName the name of your material in blender
     * @method amount the amount of laser objects in you rmodel scene
     * @method push add the lasers to a primary group
     */
    constructor(public scene: ModelScene, public object: GroupObjectTypes) {}
    /**pass a variable to modify your laser objects in any way */
    modify(envMod: (x: Environment | Geometry) => void) {
        this.json.mod = envMod
    }
    /**the name of your blender material */
    matName(name: string) {
        this.json.mat = name
    }
    amount(amount: number) {
        this.json.amt = amount
    }
    /**add the lasers to the primary group */
    push() {
        const laserMats = []
        const obj = this.object
        this.json.mod(obj)
        for(let i = 0; i < this.json.amt; i++) {
            laserMats.push(this.json.mat+`${i}`)
        }
        this.scene.addPrimaryGroups(laserMats, obj)
    }
}
