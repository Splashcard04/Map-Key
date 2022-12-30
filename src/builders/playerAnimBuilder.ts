import { playerAnim } from '../utils/playerAnim.ts'
import { KeyframesVec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { logFunctionss } from '../utils/general.ts'

export type playerAnimSettings = {
    time: number,
    timeEnd: number,
    position?: KeyframesVec3,
    rotation?: KeyframesVec3,
    playerTrack?: string,
    noteTrack?: string
}

export class playerAnimBuilder {
    constructor (settings: playerAnimSettings) {
        /**
     * @param {number} time the time to start the animation
     * @param {number} timeEnd the time to end the player animation
     * @param {KeyframesVec3} position the position animation of the player
     * @param {KeyframesVec3} rotation the rotation animation of the player
     * @param {string} playerTrack the alternative track for the player to be assigned to
     * @param {string} noteTrack the alternitive track for the notes to be assigned to
     * @author splashcard
     */

    new playerAnim(settings.time, settings.timeEnd, settings.position, settings.rotation, settings.playerTrack, settings.noteTrack).push()

    if(logFunctionss) { console.log(`new player animation at ${settings.time} until ${settings.timeEnd}`) }
    }
}
