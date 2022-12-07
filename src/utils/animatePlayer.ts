import { KeyframesVec3, CustomEvent, notesBetween, chainsBetween, arcsBetween } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
 * animate the player and notes at once :)
 * @param time the time at which the track will start
 * @param timeMax the end time of the animate track
 * @param positions the position of the animate Track CAN USE MULTIPLE POINTS
 * @param rotations the rotation animation of the player track
 * @author splashcard__
*/

export class playerAnim {
  constructor(time timeEnd) {
    this.time = time
    this.timeEnd = timeEnd
  }
  position(positions: Vec3) {
    const dur = this.timeEnd - this.time

    new CustomEvent(time).assignPlayerToTrack("player").push();

    new CustomEvent(time).assignTrackParent(["note"], "player").push();
  
    const player = new CustomEvent(time).animateTrack("player", duration);
    player.animate.position = positions;
    player.push();
  
    notesBetween(time, timeMax, note => [
      note.customData.track = "note"
    ])
    chainsBetween(time, timeMax, c => {
      c.customData.track = "note"
    })
    arcsBetween(time, timeMax, c => {
      c.customData.track = "note"
    })
  }
  rotation(rotations: Vec3) {
    const dur = this.timeEnd - this.time

    new CustomEvent(time).assignPlayerToTrack("player2").push();

    new CustomEvent(time).assignTrackParent(["note2"], "player2").push();
  
    const player = new CustomEvent(time).animateTrack("player", duration);
    player.animate.rotation = rotations
    player.push();
  
    notesBetween(time, timeMax, note => [
      note.customData.track = "note2"
    ])
    chainsBetween(time, timeMax, c => {
      c.customData.track = "note2"
    })
    arcsBetween(time, timeMax, c => {
      c.customData.track = "note2"
    })
  }
}