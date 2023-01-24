import { playerAnim } from '../utils/animatePlayer.ts'
import { CustomEventInternals } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export type playerAnimSettings = {
    time: number,
    timeEnd: number,
    animation?: (x: CustomEventInternals.AnimateTrack) => void,
    playerTrack?: string,
    noteTrack?: string
}

export class playerAnimBuilder {
    /**
     * A builder to aid in the creation of player animations.
     * @param {number} settings.time the time to start the animation
     * @param {number} settings.timeEnd the time to end the player animation
     * @param {KeyframesVec3} settings.position the position animation of the player
     * @param {KeyframesVec3} settings.rotation the rotation animation of the player
     * @param {string} settings.playerTrack the alternative track for the player to be assigned to
     * @param {string} settings.noteTrack the alternitive track for the notes to be assigned to
     * @author splashcard
     */
    constructor (public settings: playerAnimSettings) {}
    push() {
        const pa = new playerAnim(this.settings.time, this.settings.timeEnd, this.settings.animation);
        if(this.settings.noteTrack){
            pa.noteTrack = this.settings.noteTrack
        }
        if(this.settings.playerTrack){
            pa.playerTrack = this.settings.playerTrack
        }
        pa.push()
    }
}