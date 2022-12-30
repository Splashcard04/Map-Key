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
   constructor(public time: number = 0, public timeEnd: number = 0, public position: KeyframesVec3 | undefined = undefined, public rotation: KeyframesVec3 | undefined = undefined, public playerTrack: string = "player", public noteTrack: string = "notes") {} // Empty constructor lol
   /**
    * Pushes the player animation to the active diff.
    */
   push() {
       const duration = this.timeEnd - this.time

       new CustomEvent(this.time).assignPlayerToTrack(this.playerTrack).push();

       const track = new CustomEvent(this.time).animateTrack(this.playerTrack, duration)
       // Adds position animation if there is any.
       if(this.position){
        track.animate.position = this.position
       }
       // Adds rotation animation if there is any.
       if(this.rotation){
        track.animate.rotation = this.rotation
       }
       // Only pushes the animate track if it has any animation data
       // That way playerAnim can also be used just to assign all the tracks and parents and stuff, and can then be animated externally.
       if(this.rotation || this.position){
        track.push();
       }

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
