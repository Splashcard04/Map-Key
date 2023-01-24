import { CustomEvent, CustomEventInternals } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { allBetween, logFunctionss, MKLog } from "./general.ts";

export class playerAnim {

    /**
     * A class to animate notes and the player at once
     * @param time the time to start animating the player
     * @param timeEnd the time to stop animating the player
     * @param animation assign data to the track to assign player / notes to
     * @author @Splashcard @Aurellis
     */
    constructor(public time: number = 0, public timeEnd: number = 0, public animation?: (x: CustomEventInternals.AnimateTrack) => void) {}

    get playerTrack() { return this.playerTrack }
    set playerTrack(track: string) { this.playerTrack = track }

    get noteTrack() { return this.noteTrack }
    set noteTrack(track: string) { this.noteTrack = track }
    

    push() {
        // Figure out how to check if a push() statement was included. Then MKLog a warning.
        if(!this.playerTrack) {
            this.playerTrack = "player"
        }

        if(this.animation){
            const anim = new CustomEvent(this.time).animateTrack(this.playerTrack, this.timeEnd - this.time);
            this.animation(anim);
            anim.push();
        }

        if(!this.noteTrack) { 
            this.noteTrack = "notes"
        }
        new CustomEvent(this.time).assignPlayerToTrack(this.playerTrack).push()
        new CustomEvent(this.time).assignTrackParent([this.noteTrack], this.playerTrack).push()
        allBetween(this.time, this.timeEnd, n => {
            n.track.add(this.noteTrack)
        })

        if(logFunctionss){
            MKLog(`Added new player animation at beat ${this.time} until beat ${this.timeEnd}...`)
        }
    }
}