import { activeDiffGet, copy, info, Json, jsonPrune, LightEvent } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { MKLog } from "./general.ts"

export type userSharedEnvSettings = {
    name?: string,
    author?: string,
    environmentVersion?: string,
    description?: string,
    features?: {
        forceEffectsFilter?: "AllEffects" | "StrobeFilter" | "NoEffects"
        useChromaEvents?: true,
        basicBeatMapEvents?: LightEvent
    }
}


/**
 * Takes the environments from the map and converts them into a user shared environment. This function changes the map data, so make sure you run it after your map.save() line.
 * @param settings The settings for the environment file.
 */
export async function exportShareableEnv(settings: userSharedEnvSettings){

    // Optimise this section later
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

    // Convert the type and material to their underscored counterparts and remove tracks
    activeDiffGet().geometry(arr =>{
        arr.forEach(geo =>{
            geo.json.geometry = {
                _type: geo.type,
                _material: geo.material
            }
            if(geo.json.track){
                delete geo.json.track
            }
            jsonPrune(geo)
        })
    })
    activeDiffGet().environment(arr =>{
        arr.forEach(env =>{
            if(env.json.track){
                delete env.json.track
            }
            jsonPrune(env)
        })
    })

    // Create the json object
    const outData = {
        version: "1.0.0",
        name: settings.name,
        author: settings.author,
        environmentVersion: settings.environmentVersion,
        environmentName: info.environment,
        description: settings.description,
        features: settings.features,
        environment: activeDiffGet().customData.environment,
        materials: activeDiffGet().geoMaterials
    }

    // There has got to be a better way to do this...
    const envlength = outData.environment.length;
    outData.environment.forEach((obj: Json) =>{
        const objectJson: Json = copy(obj.json);
        delete obj.json;
        outData.environment.push(objectJson);

    });
    for(let i = 0; i < envlength; i++){
        outData.environment.shift()
    }

    //Create the file
    try {
        await Deno.writeTextFile(`${settings.name}.dat`, JSON.stringify(outData));
    } catch(error) {
        console.log(error);
    }
    MKLog(`Exported ${envlength} environments to "${settings.name}.dat"...`)
}