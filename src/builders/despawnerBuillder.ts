import { LOOKUP } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { advDespawner, despawner } from "../exports.ts"

export type despawnerSettings = {
    lookupMethod: LOOKUP,
    ids: string[],
    despawnMethod: "RegularDespawn" | "HardDespawn",
    restore?: string[]
}

export function despawn(settings: despawnerSettings){
    const ds = new despawner(settings.lookupMethod,settings.ids);
    if(settings.despawnMethod == "RegularDespawn"){
        ds.despawn()
    }
    if(settings.despawnMethod == "HardDespawn"){
        ds.hardDespawn()
    }
    if(settings.restore){
        ds.restore(settings.restore)
    }
}

export type advDespawnerSettings = {
    ids: [string,LOOKUP][],
    despawnMethod: "RegularDespawn" | "HardDespawn",
    restore?: [string,LOOKUP][]
}

export function multiDespawn(settings: advDespawnerSettings){
    const ds = new advDespawner(settings.ids);
    if(settings.despawnMethod == "RegularDespawn"){
        ds.despawn()
    }
    if(settings.despawnMethod == "HardDespawn"){
        ds.hardDespawn()
    }
    if(settings.restore){
        ds.restore(settings.restore)
    }
}