import { Environment, Geometry, GroupObjectTypes, Json, ModelScene, RMLog, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { logFunctionss } from "./general.ts" 
/**
 * @param object geometry or environment object for your group
 * @param ammount the ammount of the stated object
 * @param scale? the scale of your stated object 
 * @author splashcard__
 */

type groupSettings = {
    addGroup: boolean,
    sceneName: ModelScene,
    transForm?: Vec3
}

export class laserGroup {
    constructor(
        public object: GroupObjectTypes,
        public amount: number,
        public blenderMatName: string,
        public lightID: number,
        public lightType: number,
        public addGroup?: groupSettings
    ) {
        this.object = object
        this.amount = amount
        this.blenderMatName
        this.lightID = lightID
        this.lightType = lightType
        this.addGroup = addGroup
    }
    push() {
        const lasers = this.amount;
        const laserTracks: string[] = [];
        const laserEnv = this.object
        laserEnv.lightID = this.lightID
        laserEnv.lightType = this.lightType
        for (let i = 1; i <= lasers; i++) laserTracks.push(`${this.blenderMatName}${i}`);

        if(this.addGroup) {
            this.addGroup.sceneName.addPrimaryGroups(
                this.blenderMatName,
                this.object,
                this.addGroup.transForm
            )
        }
        if(logFunctionss) { console.log(`new light group with object ${this.object}`)}
    }
}
