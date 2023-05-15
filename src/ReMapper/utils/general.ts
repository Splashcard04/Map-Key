import { ensureDir } from "https://deno.land/std@0.110.0/fs/ensure_dir.ts";
import { arcsBetween, arrDiv, arrMul, arrSubtract, chainsBetween, ColorType, DIFFS, EASE, FILENAME, getSeconds, info, lerp, Note, notesBetween, rotatePoint, setDecimals, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { BFM_PROPS } from "../constants.ts";

export let logFunctionss = false;

/**
 * Put this at the top of your script to console log functions as they are executed.
 */
export function logFunctions(): void {
	logFunctionss = true;
}

/**
 * Convert gamma RGB to linear RGB. (RGB from 0-255, into RGB from 0-1).
 * @param value RGB color from 0-255, alpha values are still 0-1.
 * @param colorMultiplier Optional, multiplier for your color to make it brighter.
 * @returns ColorType - Linear RGB values.
 * @author splashcard__ & scuffedItalian
 */
export function rgb(value: ColorType, colorMultiplier?: number) {
	if (!value[3]) value.push(1);
	else value[3] = value[3] * 255;
	if (colorMultiplier) {
		return arrMul(value, colorMultiplier / 255).map(x => {
			return setDecimals(x, 3);
		}) as ColorType;
	} else {
		return arrDiv(value, 255).map(x => {
			return setDecimals(x, 3);
		}) as ColorType;
	}
}

export function allBetween(time: number, timeEnd: number, forAll: (n: Note) => void) {
	notesBetween(time, timeEnd, forAll);
	arcsBetween(time, timeEnd, forAll);
	chainsBetween(time, timeEnd, forAll);
}

export class blenderFrameMath {
	/**
	 * Some basic math to aid with the timing of Blender animations to RM.
	 * @param bpm The BPM of the song.
	 * @param beats The duration of your animation in RM.
	 * @param fps The fps of your blender project.
	 * @author Aurellis
	 */
	constructor(public bpm: number, public beats: number, public fps: number) {}
	/**
	 * Console logs the duration (in seconds) that you animation goes for in the song.
	 */
	durationInSong() {
		console.log(`An animation of ${this.beats} beats at ${this.bpm} BPM will take ${(this.beats * 60) / this.bpm} seconds`);
	}
	/**
	 * Console logs the total frames required in blender to match your animation.
	 */
	totalFramesInBlender() {
		console.log(`The animation will need ${(this.beats * this.fps * 60) / this.bpm} total frames in blender at ${this.fps} fps.`);
	}
	/**
	 * Console logs the length in seconds and frames that each beat in your song will take.
	 */
	beatLength() {
		console.log(`Each beat takes ${60 / this.bpm} seconds, or ${(this.fps * 60) / this.bpm} frames`);
	}
	/**
	 * Gets the same information that the other methods supply. Returning it rather than logging it.
	 * @param property The property you wish to return.
	 * @returns The value of the property.
	 */
	returnProperty(property: BFM_PROPS) {
		const _beatTime = 60 / this.bpm; //Seconds per song beat
		const _seconds = this.beats * _beatTime; //Seconds of full animation
		const _totalFrames = _seconds * this.fps; //Total frame count of the full animation
		const _framesPerBeat = _beatTime * this.fps; //Like _beat_time but synced to fps
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
export async function copytodir(diffs: FILENAME<DIFFS>[] = [], todir: string, otherFiles?: Array<string>) {
	await ensureDir(todir);
	Deno.copyFile("Info.dat", `${todir}\\Info.dat`);
	diffs.forEach(file => {
		Deno.copyFile(`${file}.dat`, `${todir}\\${file}.dat`);
	});
	const song = info.json._songFilename;
	Deno.copyFile(song, `${todir}\\${song}`);
	if (info.json._coverImageFilename !== undefined) {
		Deno.copyFile(info.json._coverImageFilename, `${todir}\\${info.json._coverImageFilename}`);
	}
	otherFiles?.forEach(file => {
		Deno.copyFile(`${file}`, `${todir}\\${file}`);
	});
	MKLog(`Copied map to ${todir}`);
}

/**
 * Log any message labeled as a MapKey lint process.
 * @param message The message to log with Map Key label.
 * @param errorLevel Whether to log the message as a warning or an error (or leave blank for regular log)
 */

// deno-lint-ignore no-explicit-any
export function MKLog(message: any, errorLevel?: "Warning" | "Error") {
	if (!errorLevel) {
		console.log(`[MapKey:   ${getSeconds()}s] ${message}`);
	}
	if (errorLevel == "Error") {
		console.log(`\x1b[1m\x1b[31m[Error In MapKey: ${getSeconds()}s] \x1b[31m${message}\x1b[1m\x1b[37m`);
	}
	if (errorLevel == "Warning") {
		console.log(`\x1b[1m\x1b[33m[Warning In MapKey: ${getSeconds()}s] \x1b[1m\x1b[33m${message}\x1b[1m\x1b[37m`);
	}
}

/**
 * Finds the unit vector in the same direction as another vector.
 * @param vector The vector to find the unit of.
 * @returns Vec3 - The unit vector in the direction of the input vector.
 */
export function vectorUnit(vector: Vec3) {
	const mag = Math.hypot(vector[0], vector[1], vector[2]);
	return [vector[0] / mag, vector[1] / mag, vector[2] / mag] as Vec3;
}

/**
 * Finds the rotation of an object at point1 so that it faces point2.
 * @param point1 The position of the object.
 * @param point2 Where the object should be facing.
 * @param defaultAngle The angle that determines where "forwards" is for the object, defaults to the +z axis. (i.e., player - [0,0,0], notes - [0,180,0], upwards facing lasers - [-90,0,0] etc.)
 * @returns Vec3 - The rotation for the object at point1.
 * @author Aurellis
 */
export function pointRotation(point1: Vec3, point2: Vec3, defaultAngle?: Vec3) {
	const vector = arrSubtract(point2, point1);
	const angle = [0, (180 * Math.atan2(vector[0], vector[2])) / Math.PI, 0];
	const pitchPoint = rotatePoint(vector, [0, -angle[1], 0]);
	angle[0] = (-180 * Math.atan2(pitchPoint[1], pitchPoint[2])) / Math.PI;
	if (defaultAngle) {
		return arrSubtract(angle, defaultAngle) as Vec3;
	} else {
		return angle as Vec3;
	}
}

/**
 * Repeats some code a number of times.
 * @param repeat How many times to repeat the code.
 * @param code The code to repeat, written as repeatvariablename =>{code}.
 * @example repeat(20, rep =>{ console.log(rep) })
 */
export function repeat(repeat: number, code: (i: number) => void) {
	for (let i = 0; i < repeat; i++) code(i);
}

/**
 * Lerps the values of 2 arrays.
 * @param startArr The starting arr. This must be shorter than or equal to the second arr.
 * @param endArr The ending arr. This must be longer than or equal to the first arr.
 * @param fraction The fraction of lerp.
 * @param easing Any easing to use.
 * @returns number[] - with length = startArr
 */
export function arrLerp(startArr: number[], endArr: number[], fraction: number, easing?: EASE) {
	if (startArr.length > endArr.length) {
		MKLog("First array must be shorter or equal to the second array.", "Error");
		return [0] as number[];
	}
	const res: number[] = [];
	repeat(startArr.length, i => {
		res.push(lerp(startArr[i], endArr[i], fraction, easing));
	});
	return res;
}

/**
 * Finds the distance between 2 points.
 * @param point1 The first point.
 * @param point2 The second point.
 * @returns number - The distance between point1 and point2.
 */
export function distance(point1: Vec3, point2: Vec3) {
	// Literally just an abstraction of Math.hypot(), but it is a bit more user-friendly
	return Math.hypot(point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]);
}
