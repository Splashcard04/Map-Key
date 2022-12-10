import { activeDiff } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

export function logMapData(objects?: boolean, environment?: boolean, fakeArray?: boolean) {
    const map = activeDiff
    
    if(objects !== undefined && objects === true) {
        console.log('\n======================Objects==========================\n')
        console.log(`\n Notes:`, map.notes.length, `\n Walls:`, map.walls.length, `\n bombs:`, map.bombs.length)
    }
    if(environment !== undefined && environment === true) {
        console.log(`==========================Environment======================`)
        console.log(`\n Environment:`, map.customData.environment)
    }
    if(fakeArray !== undefined && fakeArray === true) {
        console.log(`========================fake objects=======================`)
        console.log(`\n Fake notes:`, map.fakeNotes.length, `\n Fake walls:`, map.fakeWalls.length, `\n Fake bombs:`, map.fakeBombs.length, `\n Fake Chains: `, map.fakeChains.length)
    }
}