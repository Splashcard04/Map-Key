import { ModelScene, GroupObjectTypes, Environment, Geometry } from "https://deno.land.x.remapper@3.1.1/src/mod.ts"

export class laserScene {
    constructor(public sceneName: ModelScene, public object: GroupObjectTypes) {
        this.sceneName = sceneName
        this.object = object
    }

    modify(public envMod: (x: Environment | Geometry)) {
        this.mod = envMod
    }

    matName(public name: string) {
        this.mat = name
    }

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