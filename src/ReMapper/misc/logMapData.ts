import { activeDiff } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { graphDistribution } from "./random.ts";

export class functionLogger {
    /**
     * log specific pieces of your map to the console
     * @param objects log object data to the console?
     * @param fakeArray log fake object data to the console?
     * @param moddedMapData log modded map data to the console?
     */
    constructor(public objects: boolean = true, public fakeArray: boolean = true, public moddedMapData: boolean = true) {}
    run(graph?: boolean){
        const map = activeDiff

        console.log(`
        \x1b[3m ================ ${map.name} ================
        `)

        if(this.objects) {
            console.log(`\x1b[36m======== Object Data ========`, '\n', `\x1b[32mnotes: ${map.notes.length} \n walls: ${map.walls.length} \n bombs: ${map.bombs.length} \n arcs: ${map.arcs.length} \n chains: ${map.chains.length}`);
            if(graph){
                console.log(`\x1b[36mMap note frequency:\n\x1b[31mStart:\x1b[97m`)
                let arr: number[] = [];
                map.notes.forEach(note =>{
                    arr.push(note.time)
                })
                graphDistribution(arr, 20, 100);
                console.log("\x1b[31mEnd...\x1b[97m");
                console.log("\x1b[36mMap wall frequency:\n\x1b[31mStart:\x1b[97m")
                arr = [];
                map.walls.forEach(wall =>{
                    arr.push(wall.time)
                })
                graphDistribution(arr, 20, 100);
                console.log("\x1b[31mEnd...\x1b[97m");
            }
        }

        if(this.fakeArray) {
            console.log(`\x1b[36m======== Fake Array ========`, '\n', `\x1b[32mfake notes: ${map.fakeNotes.length} \n fake walls: ${map.fakeWalls.length} \n fake bombs: ${map.fakeBombs.length} \n fake chains: ${map.fakeChains}`)
            if(graph){
                console.log(`\x1b[36mMap fake note frequency:\n\x1b[31mStart:\x1b[97m`)
                let arr: number[] = [];
                map.fakeNotes.forEach(note =>{
                    arr.push(note.time)
                })
                graphDistribution(arr, 20, 100);
                console.log("\x1b[31mEnd...\x1b[97m");
                console.log("\x1b[36mMap fake wall frequency:\n\x1b[31mStart:\x1b[97m")
                arr = [];
                map.fakeWalls.forEach(wall =>{
                    arr.push(wall.time)
                })
                graphDistribution(arr, 20, 100);
                console.log("\x1b[31mEnd...\x1b[97m");
            }
        }

        if(this.moddedMapData) {
            console.log(`\x1b[36m======== Modded Map Data ========\n \x1b[32manimateTracks: ${map.animateTracks.length}\n path animations: ${map.assignPathAnimations.length}\n parentTracks: ${map.assignTrackParents.length}\n player tracks: ${map.assignPlayerToTracks.length}\x1b[97m`)
            if(graph){
                console.log(`\x1b[36mMap animateTrack frequency:\n\x1b[31mStart:\x1b[97m`)
                const array: number[] = [];
                map.animateTracks(arr =>{
                    arr.forEach(anim =>{
                        array.push(anim.time)
                    })
                })
                graphDistribution(array, 20, 100);
                console.log("\x1b[31mEnd...\x1b[97m");
            }
        }
    }
}
