import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
 * despawns any environment peice(s)
 * @param lookup lookup method for environment peice(S)
 * @param id id(s) for environment peices 
 * @param excludes (optional) objects to exclude when despawning large ammounts of environment peices 
 * @param hadrDespawn (optional) completely despawn selected objects?
 * @author splashcard__
*/

export class despawner {
  constructor(lookup?: LOOKUP, ids?: Array<string>) {
    if(lookup == undefined) {let lookup = "Contains"}
    if(ids !== undefined) {
      ids.forEach(obj => {
        const env = new Environment(obj, lookup)
        env.position = [-9999, -9999, -9999]
        env.push();
      });
    }
  }
  excludes(look?: LOOKUP, ids?: Array<string>) {
    if(look == undefined) {let look = "Contains"}
    if(ids !== undefined) {
        ids.forEach(id => {
            const env = new Environment(id, look)
            env.position = [0, 0, 0]
            env.push();
        })
    }
  }
  hardDespawn(lookup?: LOOKUP, ids?: Array<string>) {
    if(lookup == undefined) { let lookup = "Contains"}
    if(ids !== undefined) {
        ids.forEach(id => {
            const env = new Environment(id, lookup)
            env.active = false;
            env.push();
        })
    }
  }
}