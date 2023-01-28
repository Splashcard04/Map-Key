import { Geometry, activeDiffGet, Environment, Note } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { GEO_FILTER_PROPS, ENV_FILTER_PROPS, position, rotation, scale, NOTE_FILTER_PROPS, localRotation } from "../constants.ts";
import { logFunctionss, MKLog } from "./general.ts";

/**
 * Works like notesBetween, except it searches for geometry with multiple properties and values for those properties.
 * @param filter The [[property, value], [property, value]] etc. that the geometry must have to pass.
 * @param forEach What to execute for each geometry piece that passes.
 * @author Aurellis
 */
export function filterGeometry(filter: [GEO_FILTER_PROPS | position | rotation | scale, number[] | string | number][], forEach: (x: Geometry) => void) {
  let count = 0;
  activeDiffGet().geometry((arr: Geometry[]) => {
    arr.forEach(geo =>{
      let pass = true
      filter.forEach(fill => {
        if(fill[0] == "track"){
          if(!geo.track.has(fill[1].toString())){
            pass = false;
          }
        }
        else {
          if(eval(`geo.${fill[0]}.toString()`) !== fill[1].toString()){
            pass = false
          }
        }
      })
      if(pass){
        forEach(geo)
        count++
      }
    })
  })
  if(logFunctionss){
    MKLog(`Filtered ${activeDiffGet().geometry(arr =>{arr.length})} geometry... Objects found: ${count}...`)
  }
}

/**
 * Works like notesBetween, except it searches for environments with multiple properties and values for those properties.
 * @param filter The [[property, value], [property, value]] etc. that the environments must have to pass.
 * @param forEach What to execute for each environment that passes.
 * @author Aurellis
 */
export function filterEnvironments(filter: [ENV_FILTER_PROPS | position | rotation | scale, number[] | string | number][], forEach: (x: Environment) => void) {
  let count = 0;
  activeDiffGet().environment((arr: Environment[]) => {
    arr.forEach(env =>{
      let pass = true
      filter.forEach(fill => {
        if(fill[0] == "track"){
          if(!env.track.has(fill[1].toString())){
            pass = false;
          }
        }
        else {
          if(eval(`env.${fill[0]}.toString()`) !== fill[1].toString()){
            pass = false
          }
        }
      })
      if(pass){
        forEach(env)
        count++
      }
    })
  })
  if(logFunctionss){
    MKLog(`Filtered ${activeDiffGet().environment(arr =>{arr.length})} environments... Objects found: ${count}...`)
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
    if(fill[0] == "fake" && fill[1]){
      fake = true
    }
  })
  if(fake){
    activeDiffGet().fakeNotes.forEach((n: Note) =>{
      let pass = true;
      filter.forEach(fill =>{
        if(fill[0] !== "fake"){
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