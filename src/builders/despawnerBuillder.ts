import { despawner } from '../utils/despawner.ts'
import { LOOKUP } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { logFunctionss } from '../utils/general.ts'

export type despawnerSettings = {
    lookup: LOOKUP,
    ids: string[],
    hardDespawn?: string[],
    restore?: string[]
}

export function despawnerBuilder(settings: despawnerSettings) {
    /**
     * @param {LOOKUP} lookup the lookup method of despawned and restored environment pieces
     * @param {string[]} ids the array of environment ids to despawn
     * @param { string[] } hardDespawn environment pieces to set to active = false
     * @param {string[]} restore environment peices to restore from being despawned
     * @author splashcard
     */
    const x = new despawner(settings.lookup, settings.ids, settings.hardDespawn, settings.restore).push();

    if(logFunctionss) { console.log(`new despawner built using ${settings.lookup}`)}
}
