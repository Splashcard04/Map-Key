import { Geometry, activeDiffGet, Environment } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { GEO_FILTER_PROPS, ENV_FILTER_PROPS, position, rotation, scale } from "../constants.ts";

/**
 * Works like notesBetween. Except it searches for geometry, with a set value for any property on the object as the filter.
 * @param property The property to check for on each geometry object. This can either be an autofill property like "position", or it can be one of the available enums (like position.x).
 * @param value The value that the property must be to pass.
 * @param forEach What to execute for each object that passes.
 * @author Aurellis
 * @todo Enum property for easier use.
 */
export function filterGeometry(property: GEO_FILTER_PROPS | position | rotation | scale, value: number[] | string | number, forEach: (x: Geometry) => void){
    activeDiffGet().geometry((arr: Geometry[]) =>{
      if(property === "track"){
        arr.forEach(x =>{
          if (x.track.has(value.toString())){
              forEach(x);
          }
        })
      }
      else {
        arr.forEach((x) =>{
          if(eval(`x.${property}.toString()`) == value.toString()){
              forEach(x);
          }
        })
      }
    })
  }
  
  /**
   * Works like notesBetween. Except it searches for environments, with a set value for any property on the object as the filter.
   * @param property The property to check for on each environment object. This can either be an auto-fill property like "position", or it can be one of the available enums (like position.x).
   * @param value The value that the property must be to pass.
   * @param forEach What to execute for each object that passes.
   * @author Aurellis
   * @todo Enum property for easier use.
   */
  export function filterEnvironments(property: ENV_FILTER_PROPS | position | rotation| scale, value: number[] | string | number, forEach: (x: Environment) => void){
    activeDiffGet().environment((arr: Environment[]) =>{
      if(property === "track"){
        arr.forEach(x =>{
          if (x.track.has(value.toString())){
              forEach(x);
          }
        })
      }
      else {
        arr.forEach((x) =>{
          if(eval(`x.${property}.toString()`) == value.toString()){
              forEach(x);
          }
        })
      }
    })
}