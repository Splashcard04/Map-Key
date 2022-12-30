import { KeyframesVec3, CustomEvent, RMLog } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { allBetween, logFunctionss } from './general.ts' 


export class playerAnim {
    /**
     * A class to help with animating the player and the notes together.
     * @param time The time to start the animation (defaults to 0 if left empty).
     * @param timeEnd The time to end the animation.
     * @param position The position keyframes for the player animation.
     * @param rotation The rotation keyframes for the player animation.
     * @param playerTrack The track to assign the player (defaults to "player" if left empty).
     * @param noteTrack The track to assign to the notes (defaults to "notes" if left empty).
     * @author splashcard__ & Aurellis
     */
   constructor(public time: number = 0, public timeEnd: number = 0, public position: KeyframesVec3 | undefined = undefined, public rotation: KeyframesVec3 | undefined = undefined, public playerTrack: string = "player", public noteTrack: string = "notes") {}
   push() {
       const duration = this.timeEnd - this.time
       new CustomEvent(this.time).assignPlayerToTrack(this.playerTrack).push();

       const track = new CustomEvent(this.time).animateTrack(this.playerTrack, duration)
       if(this.position){
        track.animate.position = this.position
       }
       if(this.rotation){
        track.animate.rotation = this.rotation
       }
       track.push();

       new CustomEvent(this.time).assignTrackParent([this.noteTrack], this.playerTrack).push();

       allBetween(this.time, this.timeEnd, x => {
        if(!x.track.has(this.noteTrack)){
            x.track.add(this.noteTrack)
        }
       });
       if(logFunctionss){
        RMLog(`Added new player animation at beat ${this.time} until beat ${this.timeEnd}...`)
       }
   }

}
