import { AnimateTrack, AssignPlayerToTrack, AssignTrackParent } from './HeckLib/main.ts'
import { allBetween } from "./general.ts";

export class playerAnim {

    /**
     * A class to animate notes and the player at once
     * @param time the time to start animating the player
     * @param timeEnd the time to stop animating the player
     * @param animation assign data to the track to assign player / notes to
     * @author @Splashcard @Aurellis
     */
    constructor(public time: number = 0, public timeEnd: number = 0, public animation?: (x: AnimateTrack) => void) {}

    playerTrack(public track: string) { this.playerTrack = track }

    noteTrack(public track: string) { this.noteTrack = track }
    

    push() {
        if(!this.playerTrack) {
            this.playerTrack = "player"
        }

        if(this.animation){
            const anim = new AnimateTrack(this.time, {
                track: this.playerTrack,
                duration: this.timeEnd - this.time
            });
            this.animation(anim)
            anim.push()


        }
        if(!this.noteTrack) { 
            this.noteTrack = "notes"
        }
        new AssignPlayerToTrack(this.time,this.playerTrack).push()
        new AssignTrackParent(this.time,{childrenTracks: [this.noteTrack], parentTrack: this.playerTrack})
        allBetween(this.time, this.timeEnd, n => {
            n.data.track = this.noteTrack
        })
    }
}