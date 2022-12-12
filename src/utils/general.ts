import { ensureDir } from "https://deno.land/std@0.110.0/fs/ensure_dir.ts";
import { ColorType, DIFFS, FILENAME, info, Note, RMLog, Wall } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

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

export function allBetween(includeWalls: boolean, time: number, timeEnd: number, forAll: (n: Note) => void) {
  notesBetween(time, timeEnd, forAll)
  arcsBetween(time, timeEnd, forAll)
  chainsBetween(time, timeEnd, forAll)
  if(forWall !== undefined && includeWalls === true) {
    wallsBetween(time, timeEnd, forAll)
  }
}

/**
 * Does some basic math to help with working out the frame values in blender compared to a Beat SAber project.
 * Call the function by itself, it will log all of the necessary info in the console.
 * @param bpm The BPM of your song.
 * @param beats The number of beats you want the animation to play over.
 * @param fps The FPS of your blender project.
 * @author Aurellis
 */
export function blenderFrameMath(bpm: number, beats: number, fps: number){
  RMLog(`For an animation of ${beats} beats at ${bpm} BPM (which will take ${beats*60/bpm} seconds)...`);
  RMLog(`You will need ${beats*fps*60/bpm} total frames in blender at ${fps} fps.`);
  RMLog(`Each beat takes ${60/bpm} seconds, or ${fps*60/bpm}} frames`);
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
