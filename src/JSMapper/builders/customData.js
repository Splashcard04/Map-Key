let createdData
let internal
let animation

export class customDataBuilder {
  /**
  * create a set of custom data which you can apply with notes between or by pushing to notes manually
  */
  /**the coordinate (_position) of your customData */
  position(pos) {
    internal += "coordinates": pos
  }
  /**the worldRotation (_rotation) of your customData */
  rotation(rot) {
    internal += "worldRotation": rot
  }
  animateDissolve(dis) {
     animation += "dissolve": dis
  }
  
  end() {
     createdData = { internal, animation }
     return createdData
  }
}
