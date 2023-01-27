const { animateTrack, assignTrackParent, notesBetween } = require(`splashcard_jsmapper`)

module.exports.playerAnimBuilder = class playerAnimBuilder {
   constructor(time = 0, timeEnd = 0) {
     this.time = time; 
     this.duration = timeEnd; 
     this.duration = timeEnd - time
   }
  
  position(pos = [[0, 0, 0, 0]]) {
     this.pos = pos
  }
  
  rotation(rot = [[0, 0, 0, 0]]) {
     this.rot = rot
  }
  
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
