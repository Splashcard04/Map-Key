import { Geometry, activeDiffGet, Environment, Note } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { GEO_FILTER_PROPS, ENV_FILTER_PROPS, position, rotation, scale, NOTE_FILTER_PROPS, localRotation } from "../constants.ts";
import { logFunctionss, MKLog } from "./general.ts";

/**
 * Works like notesBetween. Except it searches for geometry, with a set value for any property on the object as the filter.
 * @param property The property to check for on each geometry object. This can either be an autofill property like "position", or it can be one of the available enums (like position.x).
 * @param value The value that the property must be to pass.
 * @param forEach What to execute for each object that passes.
 * @author Aurellis
 */
export function filterGeometry(property: GEO_FILTER_PROPS | position | rotation | scale, value: number[] | string | number, forEach: (x: Geometry) => void){
    let count = 0
    activeDiffGet().geometry((arr: Geometry[]) =>{
      if(property === "track"){
        arr.forEach(x =>{
          if (x.track.has(value.toString())){
              forEach(x);
              count++
          }
        })
      }
      else {
        arr.forEach((x) =>{
          if(eval(`x.${property}.toString()`) == value.toString()){
              forEach(x);
              count++
          }
        })
      }
    })
    if(logFunctionss){
      MKLog(`Filtered ${activeDiffGet().geometry(arr =>{arr.length})} environments for objects with a ${property} of ${value}...\nobjects found: ${count}`)
  }
}
  
  /**
   * Works like notesBetween. Except it searches for environments, with a set value for any property on the object as the filter.
   * @param property The property to check for on each environment object. This can either be an auto-fill property like "position", or it can be one of the available enums (like position.x).
   * @param value The value that the property must be to pass.
   * @param forEach What to execute for each object that passes.
   * @author Aurellis
   */
  export function filterEnvironments(property: ENV_FILTER_PROPS | position | rotation | scale, value: number[] | string | number, forEach: (x: Environment) => void){
    let count = 0
    activeDiffGet().environment((arr: Environment[]) =>{
      if(property === "track"){
        arr.forEach(x =>{
          if (x.track.has(value.toString())){
              forEach(x);
              count++
          }
        })
      }
      else {
        arr.forEach((x) =>{
          if(eval(`x.${property}.toString()`) == value.toString()){
              forEach(x);
              count++
          }
        })
      }
    })
    if(logFunctionss){
      MKLog(`Filtered ${activeDiffGet().geometry(arr =>{arr.length})} environments for objects with a ${property} of ${value}...\nobjects found: ${count}`)
    }
}

/**
 * Works like notesBetween, except you can filter by multiple properties and values.
 * @param filter The [[property, value], [property, value]] etc. that the notes must have to pass. 
 * @param forEach What to execute for each note that passes.
 * @author Aurellis
 */
export function filterNotes(filter: [NOTE_FILTER_PROPS | rotation | localRotation, number[] | string | number | boolean][], forEach: (x: Note) => void){
  let fake = false
  let count = 0
  filter.forEach(fill =>{
    if(fill[0] == "fake" && fill[1] == true){
      fake = true
    }
  })
  if(fake){
    activeDiffGet().fakeNotes.forEach((n: Note) =>{
      let pass = true;
      filter.forEach(fill =>{
        if(fill[0] == "track"){
          if(!n.track.has(fill[1].toString())){
            pass = false;
          }
        }
        else{
          if(eval(`n.${fill[0]}.toString()`) !== fill[1].toString()){
            pass = false
          }
        }
      })
      if(pass){
        forEach(n);
        count++
      }
    })
  }
  else {
    activeDiffGet().notes.forEach((n: Note) =>{
      let pass = true;
      filter.forEach(fill =>{
        if(fill[0] == "track"){
          if(!n.track.has(fill[1].toString())){
            pass = false;
          }
        }
        else{
          if(eval(`n.${fill[0]}.toString()`) !== fill[1].toString()){
            pass = false
          }
        }
      })
      if(pass){
        forEach(n);
        count++
      }
    })
  }
  if(logFunctionss){
    MKLog(`Filtered ${activeDiffGet().fakeNotes.length+activeDiffGet().notes.length} notes... Notes found: ${count}...`)
  }
}