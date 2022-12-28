import { KeyframesVec3, CustomEvent, Note } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"
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

    allBetween(this.time, this.time+this.duration, (note: Note) => {
      // For some reason I have to do this again????
      if(typeof(this.noteTrack) !== "string"){
        this.noteTrack = "playerAnimNote";
      }
      // Incase the notes already have the track, it won't assign the track again.
      if(!note.track.has(this.noteTrack)){
        note.track.add(this.noteTrack)
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
      console.log(`
      new player animation at ${this.time} and ending at ${this.time+this.duration}
      `, '\n', `positions: ${this.position}`, '\n', `rotations: ${this.rotation}`)
    }

  }
}

// export class playerAnim {
//   json: Json = {}

//     import(json: Json) {
//         this.json = json
//         return this
//     }
//   position(positions: KeyframesVec3) {
//     const dur = this.json.timeEnd - this.json.time
//     this.json.dur = dur
//     this.json.positions = positions

//     new CustomEvent(this.json.time).assignPlayerToTrack("player").push();

//     new CustomEvent(this.json.time).assignTrackParent(["note"], "player").push();
  
//     const player = new CustomEvent(this.json.time).animateTrack("player", dur);
//     player.animate.position = positions;
//     player.push();
  
//     notesBetween(this.json.time, this.json.timeEnd, note => [
//       note.customData.track = "note"
//     ])
//     chainsBetween(this.json.time, this.json.timeEnd, c => {
//       c.customData.track = "note"
//     })
//     arcsBetween(this.json.time, this.json.timeEnd, c => {
//       c.customData.track = "note"
//     })
//   }
//   rotation(rotations: KeyframesVec3) {
//     this.json.rotations = rotations
//     const dur = this.json.timeEnd - this.json.time

//     new CustomEvent(this.json.time).assignPlayerToTrack("player2").push();

//     new CustomEvent(this.json.time).assignTrackParent(["note2"], "player2").push();
  
//     const player = new CustomEvent(this.json.time).animateTrack("player", dur);
//     player.animate.rotation = rotations
//     player.push();
  
//     notesBetween(this.json.time, this.json.timeEnd, note => [
//       note.customData.track = "note2"
//     ])
//     chainsBetween(this.json.time, this.json.timeEnd, c => {
//       c.customData.track = "note2"
//     })
//     arcsBetween(this.json.time, this.json.timeEnd, c => {
//       c.customData.track = "note2"
//     })
//   }
//   constructor(time: number, timeEnd: number) {
//     this.json.time = time
//     this.json.timeEnd = timeEnd

//     if(logFunctionss) {
//       console.log(`
//       new player animation at ${this.json.time} and ending at ${this.json.timeEnd}
//       `, '\n', `positions: ${this.json.positions}`, '\n', `rotations: ${this.json.rotations}`)
//     }
//   }
// }