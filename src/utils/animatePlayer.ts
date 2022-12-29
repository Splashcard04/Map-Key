import { KeyframesVec3, CustomEvent, RMLog } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
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
  constructor(public time: number, public duration: number, public position?: KeyframesVec3, public rotation?: KeyframesVec3, public playerTrack?: string, public noteTrack?: string) {
    this.time = time;
    this.duration = duration;
    this.position = position;
    this.rotation = rotation;
    this.playerTrack = playerTrack;
    this.noteTrack = noteTrack;
  }
  push() {
    // Confirms that there is a track for the player
    if(typeof(this.playerTrack) !== "string"){
      this.playerTrack = "player";
    }
    // Confirms that there is a track for the notes
    if(typeof(this.noteTrack) !== "string"){
      this.noteTrack = "playerAnimNote";
    }

    new CustomEvent(this.time).assignPlayerToTrack(this.playerTrack).push();
    new CustomEvent(this.time).assignTrackParent([this.noteTrack],this.playerTrack).push();

    allBetween(this.time, this.time+this.duration, (n) => {
      // For some reason I have to do this again????
      if(typeof(this.noteTrack) !== "string"){
        this.noteTrack = "playerAnimNote";
      }
      // Incase the notes already have the track, it won't assign the track again.
      if(!n.track.has(this.noteTrack)){
        n.track.add(this.noteTrack)
      }
    });

    const player = new CustomEvent(this.time).animateTrack(this.playerTrack, this.duration);
    if(this.position){
      player.animate.position = this.position;
    }
    if(this.rotation){
      player.animate.rotation = this.rotation;
    }
    player.push();

    if(logFunctionss) {
      RMLog(`New player animation added at ${this.time}...\nending at: ${this.time+this.duration}`)
    }

  }
}