import { activeDiffGet, copy, info, Json, jsonPrune } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { MKLog } from "./general.ts"

export type userSharedEnvSettings = {
    name?: string,
    author?: string,
    environmentVersion?: string,
    description?: string,
    copyLightEvents?: "All Events" | "Events At Beat 0",
    features?: {
        forceEffectsFilter?: "AllEffects" | "StrobeFilter" | "NoEffects",
        useChromaEvents?: boolean,
        basicBeatMapEvents?: Json[]
    }
}


/**
 * Takes the environments from the map and converts them into a user shared environment.
 * @param settings.name The name for the environment and environment file.
 * @param settings.author The author of the environment (probably you).
 * @param settings.environmentVersion The version of your environment.
 * @param settings.description The description of your environment. This feature is currently unused by chroma.
 * @param settings.copyLightEvents Optional to copy lighting events from the map to your env.
 * @param settings.features.forceEffectsFilter Suggests the effectsFilter to be used with the env.
 * @param settings.features.useChromaEvents Suggests the chromaEvents setting to be used with the env.
 * @param settings.features.basicBeatMapEvents The raw json of basic lighting events to be loaded with the env.
 */
export async function exportShareableEnv(settings?: userSharedEnvSettings){
    if(!settings){
        settings = {}
    }
    // Default values
    if(!settings.name){
        settings.name = `${info.name} environment`
    }
    if(!settings.author){
        settings.author = info.authorName
    }
    if(!settings.environmentVersion){
        settings.environmentVersion = "0.0.1"
    }
    if(!settings.description){
        settings.description = "Empty description..."
    }
    if(!settings.features){
        settings.features = {}
    }
    // Add light events
    const eventArray: Json[] = []
    if(settings.copyLightEvents){
        if(settings.copyLightEvents == "All Events"){
            activeDiffGet().events.forEach(ev =>{
                eventArray.push(ev)
            })
        }
        else if(settings.copyLightEvents == "Events At Beat 0"){
            activeDiffGet().events.forEach(ev =>{
                if(ev.time == 0){
                    eventArray.push(ev)
                }
            })
        }
    }
    if(eventArray.length !== 0){
        settings.features.basicBeatMapEvents = eventArray.map((x: Json) =>{return x.json})
    }
    // Convert the type and material to their underscored counterparts and remove tracks
    const envArray: Json[] = []
    activeDiffGet().geometry(arr =>{
        arr.forEach(geo =>{
            const nu = copy(geo)
            nu.json.geometry = {
                _type: geo.type,
                _material: geo.material
            }
            if(nu.json.track){
                delete nu.json.track
            }
            jsonPrune(nu)
            envArray.push(nu)
        })
    })
    activeDiffGet().environment(arr =>{
        arr.forEach(env =>{
            const nu = copy(env)
            if(nu.json.track){
                delete nu.json.track
            }
            jsonPrune(nu)
            envArray.push(nu)
        })
    })
    if(envArray.length == 0){
        MKLog("Map doesn't contain eny environments! Shareable env will be empty...", "Warning")
    }
    // Create the json object
    const outData = {
        version: "1.0.0",
        name: settings.name,
        author: settings.author,
        environmentVersion: settings.environmentVersion,
        environmentName: info.environment,
        description: settings.description,
        features: settings.features,
        environment: envArray.map((x: Json) => {return x.json}),
        materials: activeDiffGet().geoMaterials
    }
    //Create the file
    try {
        await Deno.writeTextFile(`${settings.name}.dat`, JSON.stringify(outData));
    } catch(error) {
        MKLog(error, "Error");
    }
    MKLog(`Exported ${outData.environment.length} environments to "${settings.name}.dat"...`)
}