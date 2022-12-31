import { activeDiff } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class functionLogger {
    constructor(objects: boolean = true, fakeArray: boolean = true, moddedMapData: boolean = true) {
        const map = activeDiff

        console.log(`
        \x1b[3m. ================ ${map.name} ================
        `)

        if(objects) { console.log(
        `\x1b[36m ======== Object Data ========`, '\n', `\x1b[32m notes: ${map.notes.length} \n walls: ${map.walls.length} \n bombs: ${map.bombs.length} \n arcs: ${map.arcs.length} \n chains: ${map.chains.length}`
        )}

        if(fakeArray) { console.log(
            `\x1b[36m ======== Fake Array ========`, '\n', `\x1b[32m fake notes: ${map.fakeNotes.length} \n fake walls: ${map.fakeWalls.length} \n fake bombs: ${map.fakeBombs.length} \n fake chains: ${map.fakeChains}`
        )}

        if(moddedMapData) { console.log(
            `\x1b[36m ======== Modded Map Data ========`, '\n', `\x1b[32m animateTracks: ${map.animateTracks.length} \n path animations: ${map.assignPathAnimations.length} \n parentTracks: ${map.assignTrackParents.length} \n player tracks: ${map.assignPlayerToTracks.length}`
        )}
    }
}
