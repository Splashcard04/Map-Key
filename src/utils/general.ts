import { ensureDir } from "https://deno.land/std@0.110.0/fs/ensure_dir.ts";
import { ColorType, DIFFS, FILENAME, info, Note, RMLog } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/**
 * convert rgb values easily
 * @param rgbVal input your array of rgb 255-255!
 * @returns beat saber compatible rgb values
 * @author splashcard__
 * @suggested scuffedItalian
 */


export function rgb(value: ColorType) {
  const val1 = value[0] / 255
  const val2 = value[1] / 255
  const val3 = value[2] / 255
  return [val1, val2, val3, value[3]] as ColorType
}

import { notesBetween, arcsBetween, chainsBetween, wallsBetween} from "https://deno.land/x/remapper@3.0.0/src/mod.ts"
import { BFM_PROPS } from "../constants.ts";

export function allBetween(includeWalls: boolean, time: number, timeEnd: number, forAll: (n: Note) => void) {
  notesBetween(time, timeEnd, forAll)
  arcsBetween(time, timeEnd, forAll)
  chainsBetween(time, timeEnd, forAll)
  if(forWall !== undefined && includeWalls === true) {
    wallsBetween(time, timeEnd, forAll)
  }
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
  const _beat_time = 60/this.bpm;
  const _seconds = this.beats*_beat_time;
  const _totalFrames = _seconds*this.fps;
  const _framesPerBeat = _beat_time*this.fps;
  return eval(property);
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
RMLog(`Copied map to ${todir}`)
}
