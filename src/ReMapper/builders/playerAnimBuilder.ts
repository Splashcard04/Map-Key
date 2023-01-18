import { playerAnim } from '../utils/animatePlayer.ts'
import { KeyframesVec3, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export type playerAnimSettings = {
    time: number,
    timeEnd: number,
    position?: KeyframesVec3,
    rotation?: KeyframesVec3,
    playerTrack?: string,
    noteTrack?: string
}

export class playerAnimBuilder {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this;
    }
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

        this.json.time = settings.time
        this.json.timeEnd = settings.timeEnd
        this.json.position = settings.position
        this.json.rotation = settings.rotation
        this.json.playerTrack = settings.playerTrack
        this.json.noteTrack = settings.noteTrack

    }
    push() {
        new playerAnim(this.json.time, this.json.timeEnd, this.json.position, this.json.rotation, this.json.playerTrack, this.json.noteTrack).push()
    }
}
