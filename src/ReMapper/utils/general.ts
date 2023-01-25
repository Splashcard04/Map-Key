import { ensureDir } from "https://deno.land/std@0.110.0/fs/ensure_dir.ts";
import { arcsBetween, arrSubtract, chainsBetween, ColorType, DIFFS, FILENAME, getSeconds, info, Note, notesBetween, rotatePoint, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { BFM_PROPS } from "../constants.ts"

export let logFunctionss = false

/**
 * Put this at the top of your script to console log functions as they are executed.
 */
export function logFunctions(): void {
  logFunctionss = true;
}

/**
 * convert rgb values easily
 * @param value input your array of rgb 255-255!
 * @param colorMultiplier? the multilier for your colors (esentially effects brightness)
 * @returns beat saber compatible rgb values
 * @author splashcard__ x scuffedItalian
 */


export function rgb(value: ColorType, colorMultiplier?: number) {
  if(colorMultiplier === undefined) {
    const val1 = value[0] / 255
    const val2 = value[1] / 255
    const val3 = value[2] / 255
    return [val1, val2, val3, value[3]] as ColorType
  }  else {
    const val1 = (value[0] * colorMultiplier) /255
    const val2 = (value[1] * colorMultiplier) /255
    const val3 = (value[2] * colorMultiplier) /255
    return [val1, val2, val3, value[3]] as ColorType
  }
}

export function allBetween(time: number, timeEnd: number, forAll: (n: Note) => void) {
  notesBetween(time, timeEnd, forAll)
  arcsBetween(time, timeEnd, forAll)
  chainsBetween(time, timeEnd, forAll)
}

export class blenderFrameMath {
  /**
   * Some basic math to aid with the timing of Blender animations to RM
   * @param bpm The BPM of the song.
   * @param beats The duration of your animation in RM.
   * @param fps The fps of your blender project.
   * @author Aurellis
   */
  constructor(public bpm: number, public beats: number, public fps: number){
      this.bpm = bpm;
      this.beats = beats;
      this.fps = fps;
      
  }
  /**
   * Console logs the duration (in seconds) that you animation goes for in the song.
   */
 public durationInSong() {
  console.log(`An animation of ${this.beats} beats at ${this.bpm} BPM will take ${this.beats*60/this.bpm} seconds`);
 }
 /**
  * Console logs the total frames required in blender to match your animation.
  */
 public totalFramesInBlender(){
  console.log(`The animation will need ${this.beats*this.fps*60/this.bpm} total frames in blender at ${this.fps} fps.`);
 }
 /**
  * Console logs the length in seconds and frames that each beat in your song will take.
  */
 public beatLength(){
  console.log(`Each beat takes ${60/this.bpm} seconds, or ${this.fps*60/this.bpm} frames`);
 }
 /**
  * Gets the same information that the other methods supply. Returning it rather than logging it.
  * @param property The property you wish to return.
  * @returns The value of the property.
  */
 public returnProperty(property: BFM_PROPS){
  const _beatTime = 60/this.bpm; //Seconds per song beat
  const _seconds = this.beats*_beatTime; //Seconds of full animation
  const _totalFrames = _seconds*this.fps; //Total frame count of the full animation
  const _framesPerBeat = _beatTime*this.fps; //Like _beat_time but synced to fps
  return eval(property); //Converts the string BFM_PROP into the name of one of the consts
 }
}

/**
* Copies the map to a new directory.
* Useful for if you are working outside of the default BS game directory.
* @param diffs The diff files. You must include all diffs listed in the Info.dat.
* @param todir The directory to copy to. Directory must either use double backslashes, or single forward slashes (i.e., \\ or /)
* @param otherFiles Any other files that you wish to copy over (i.e., Contributer images, scripts, models etc.)
* @example copytodir(["ExpertPlusStandard","ExpertStandard"],"C:\\Program Files (x86)\\Steam\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\Epic map",["script.ts"]);
* @author Aurellis
*/
export async function copytodir(diffs: FILENAME<DIFFS>[] = [], todir: string, otherFiles?: Array<string>){
await ensureDir(todir);
Deno.copyFile("Info.dat", `${todir}\\Info.dat`);
diffs.forEach((file) => {
    Deno.copyFile(`${file}.dat`, `${todir}\\${file}.dat`);
});
const song = info.json._songFilename
Deno.copyFile(song,`${todir}\\${song}`);
if(info.json._coverImageFilename !== undefined) Deno.copyFile(info.json._coverImageFilename,`${todir}\\${info.json._coverImageFilename}`);
otherFiles?.forEach((file) => {
    Deno.copyFile(`${file}`, `${todir}\\${file}`);
});
MKLog(`Copied map to ${todir}`)
}

/**
 * log any message labeled as a MapKey lint process.
 * @param message The message to log with Map Key label.
 * @param errorLevel Whether to log the message as a warning or an error (or leave blank for regular log)
 */

// deno-lint-ignore no-explicit-any
export function MKLog(message: any, errorLevel?: "Warning" | "Error") {
  if(!errorLevel) {
      console.log(`\x1b[32m [MapKey: ${getSeconds()}]` + `\x1b[1m \x1b[37m ${message}`)
  }
  if(errorLevel == "Error") {
      console.log(`\x1b[1m \x1b[31m [Error In MapKey: ${getSeconds()}]` + `\x1b[1m \x1b[37m ${message}`)
  }
  if(errorLevel == "Warning") {
      console.log(`\x1b[1m \x1b[33m [Warning In MapKey: ${getSeconds()}]` + `\x1b[1m \x1b[37m ${message}`)
  }
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