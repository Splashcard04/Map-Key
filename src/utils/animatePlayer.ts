import { Json, KeyframesVec3, CustomEvent, notesBetween, chainsBetween, arcsBetween } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
 * animate the player and notes at once :)
 * @param time the time at which the track will start
 * @param timeMax the end time of the animate track
 * @param positions the position of the animate Track CAN USE MULTIPLE POINTS
 * @param rotations the rotation animation of the player track
 * @author splashcard__
*/

export class playerAnim {
  json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

  constructor(time: number, timeEnd: number) {
    this.json.time = time
    this.json.timeEnd = timeEnd
  }
  position(positions: KeyframesVec3) {
    const dur = this.json.timeEnd - this.json.time
    this.json.dur = dur

    new CustomEvent(this.json.time).assignPlayerToTrack("player").push();

    new CustomEvent(this.json.time).assignTrackParent(["note"], "player").push();
  
    const player = new CustomEvent(this.json.time).animateTrack("player", dur);
    player.animate.position = positions;
    player.push();
  
    notesBetween(this.json.time, this.json.timeEnd, note => [
      note.customData.track = "note"
    ])
    chainsBetween(this.json.time, this.json.timeEnd, c => {
      c.customData.track = "note"
    })
    arcsBetween(this.json.time, this.json.timeEnd, c => {
      c.customData.track = "note"
    })
  }
  rotation(rotations: KeyframesVec3) {
    const dur = this.json.timeEnd - this.json.time

    new CustomEvent(this.json.time).assignPlayerToTrack("player2").push();

    new CustomEvent(this.json.time).assignTrackParent(["note2"], "player2").push();
  
    const player = new CustomEvent(this.json.time).animateTrack("player", dur);
    player.animate.rotation = rotations
    player.push();
  
    notesBetween(this.json.time, this.json.timeEnd, note => [
      note.customData.track = "note2"
    ])
    chainsBetween(this.json.time, this.json.timeEnd, c => {
      c.customData.track = "note2"
    })
    arcsBetween(this.json.time, this.json.timeEnd, c => {
      c.customData.track = "note2"
    })
  }
}
