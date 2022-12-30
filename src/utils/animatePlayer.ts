import { KeyframesVec3, CustomEvent, RMLog, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { allBetween, logFunctionss } from './general.ts' 


export class playerAnim {
  
     /**
   * Class to help with animating the player and the notes together.
   * @param time The time to start the animation.
   * @param duration The duration of the animation.
   * @param position Any position keyframes to add.
   * @param rotation Any rotation keyframes to add.
   * @param playerTrack (optional) The track to assign the player to. This must not be the same as noteTrack. Or if noteTrack is undefined, playerTrack must not be "playerAnimNote".
   * @param noteTrack (optional) The track to assign the notes. This can be a pre-existing track that you have already assigned the notes.
   * @author splashcard__ & Aurellis
   */

    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    constructor(time: number, timeEnd: number) {
        this.json.time = time
        this.json.timeEnd = timeEnd
    }

    position(position: KeyframesVec3) { this.json.position = position }
    rotation(rotation: KeyframesVec3) { this.json.rotation = rotation }

    playerTrack(track: string) { 
        if(track === undefined) track = "player"

        this.json.playerTrack = track
    }
    noteTrack(track: string) {
        if(track === undefined) track = "notes"

        this.json.playerTrack = track
    }

    push() {
        const duration = this.json.timeEnd - this.json.time
        new CustomEvent(this.json.time).assignPlayerToTrack(`${this.json.playerTrack}`).push();

        const track = new CustomEvent(this.json.time).animateTrack(`${this.json.playerTrack}`, duration)
        track.animate.position = this.json.position
        track.push();

        new CustomEvent(this.json.time).assignTrackParent([`${this.json.noteTrack}`], `${this.json.playerTrack}`)

        allBetween(this.json.time, this.json.timeEnd, x => {
            x.customData.track = `${this.json.noteTrack}`
        });
        if(logFunctionss){
            RMLog(`Added new player animation at beat ${this.json.time} until beat ${this.json.timeEnd}...`)
        }
    }

}
