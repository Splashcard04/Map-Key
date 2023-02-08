import { Note, activeOutput } from "./HeckLib/main.ts";
import { arrSubtract, rotatePoint, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

export function notesBetween(time: number, timeEnd: number, forNote: (n: Note) => void) {
    JSON.parse(Deno.readTextFileSync(activeOutput)).colorNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forNote(x)
        }
    })
}

export function allBetween(time: number, timeEnd: number, forAll: (n: Note) => void) {
    JSON.parse(Deno.readTextFileSync(activeOutput)).colorNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).bombNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).sliders.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).burstSliders.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).customData.fakeColorNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
}

/**
 * Finds the magnitude of a vector.
 * @param vector The vector to find the magnitude of.
 * @returns The magnitude of the vector.
 */
export function vectorMagnitude(vector: Vec3){
    return Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2)+Math.pow(vector[2],2))
  }
  
  /**
   * Finds the unit vector in the same direction as another vector.
   * @param vector The vector to find the unit of.
   * @returns The unit vector in the direction of the input vector.
   */
  export function vectorUnit(vector: Vec3){
    const mag = vectorMagnitude(vector);
    return [vector[0]/mag,vector[1]/mag,vector[2]/mag]
  }
  
  /**
   * Finds the rotation of an object at point1 so that it faces point2.
   * @param point1 The position of the object.
   * @param point2 Where the object should be facing.
   * @param defaultAngle The angle that determines where "forwards" is for the object, defaults to the +z axis. (i.e., player - [0,0,0], notes - [0,180,0], upwards facing lasers - [-90,0,0] etc.)
   * @returns The rotation for the object at point1.
   * @author Aurellis
   */
  export function pointRotation(point1: Vec3, point2: Vec3, defaultAngle?: Vec3){
    const vector = arrSubtract(point2,point1);
    const angle = [0,180*Math.atan2(vector[0],vector[2])/Math.PI,0];
    const pitchPoint = rotatePoint(vector,[0,-angle[1],0]);
    angle[0] = -180*Math.atan2(pitchPoint[1],pitchPoint[2])/Math.PI;
    if(defaultAngle){
        return arrSubtract(angle,defaultAngle)
    }
    else{
        return angle
    }
  }
  
  /**
   * Repeats some code a number of times.
   * @param repeat How many times to repeat the code.
   * @param code The code to repeat, written as repeatvariablename =>{code}.
   * @example repeat(20, rep =>{ console.log(rep) })
   */
  export function repeat(repeat: number, code: (i: number) => void) {for(let i = 0; i < repeat; i++) {code(i)}}