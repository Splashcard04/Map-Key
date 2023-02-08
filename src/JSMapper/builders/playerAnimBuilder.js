const { animateTrack, assignTrackParent, notesBetween } = require(`splashcard_jsmapper`)

module.exports.playerAnimBuilder = class playerAnimBuilder {
   /**
    * animate player and notes at the same time
    * @param { number } time the time to start animating the player
    * @param { number } timeEnd the time to stop animating the player
    * @method position the positions to animate the player to
    * @method rotation the rotation to animate the player to
    * @method push push the animation to the difficulty
    */
   constructor(time = 0, timeEnd = 0) {
     this.time = time; 
     this.duration = timeEnd; 
     this.duration = timeEnd - time
   }
  
   /**add position keyframes to the player animation */
  position(pos = [[0, 0, 0, 0]]) {
     this.pos = pos
  }
  
  /**add rotation keyframes to the player animation */
  rotation(rot = [[0, 0, 0, 0]]) {
     this.rot = rot
  }
  
  /**push the created player animation to the difficulty */
  push() {
    if(!this.pos || this.pos === undefined) { this.pos = [0, 0, 0] }
    if(!this.rot || this.rot === undefined) { this.rot = [0, 0, 0] }
    new animateTrack({ 
      time: this.time, 
      duration: this.duration, 
      animatePosition: this.pos, 
      animateRotation: 
      this.rot
    }).push()
    
    new assignTrackParent({
       parentTrack: "player",
       childTracks: ["notes"]
    })
    
    new assignPlayerToTrack({ time: this.time, track: "player" }).push()
    notesBetween(this.time, this.duration, {
       _track: "notes"
    })
  }
}
