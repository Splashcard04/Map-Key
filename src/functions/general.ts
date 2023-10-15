// deno-lint-ignore-file no-explicit-any
import { ensureDir } from "https://deno.land/std@0.110.0/fs/ensure_dir.ts";
import { arcsBetween, arrMul, arrSubtract, chainsBetween, ColorType, DIFFS, EASE, FILENAME, getSeconds, info, jsonRemove, Note, notesBetween, rotatePoint, setDecimals, Vec3 } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { seedRNG } from "./random.ts";
import { ensureFileSync } from "https://deno.land/std@0.110.0/fs/ensure_file.ts";

/**
 * Put this at the top of your script to console log functions as they are executed.
 */
export function setFunctionLogging(state?: boolean): void {
	if (typeof state == "undefined") {
		state = true;
	}
	MKCache("Write", "logFunctions", state);
}

/**
 * Access and modify the MK_Cache.
 * @param process Whether to read the cache fo write to it.
 * @param name The name of the entry in the chache to access.
 * @param data The data to write (if write process is specified), if left undefined the property will be removed from the cache.
 */
export function MKCache(process: "Read" | "Write", name: string, data?: any) {
	const fileName = "MK_Cache.json";
	ensureFileSync(fileName);
	if (process == "Read") {
		try {
			const cache: Record<string, any> = JSON.parse(Deno.readTextFileSync(fileName));
			return cache[name];
		} catch (e) {
			console.error(`MK_Cache suffered from error, invalidating cache: ${e}`);
			Deno.writeTextFileSync(fileName, JSON.stringify({}));
		}
	} else {
		try {
			const cache: Record<string, any> = JSON.parse(Deno.readTextFileSync(fileName));
			if (typeof data == "undefined") {
				jsonRemove(cache, name);
			} else {
				cache[name] = data;
			}
			Deno.writeTextFileSync(fileName, JSON.stringify(cache));
		} catch (e) {
			console.error(`MK_Cache suffered from error, invalidating cache: ${e}`);
			Deno.writeTextFileSync(fileName, JSON.stringify({}));
		}
	}
}

/**
 * Convert gamma RGB to linear RGB. (RGB from 0-255, into RGB from 0-1).
 * @param value RGB color from 0-255, alpha values are still 0-1.
 * @param colorMultiplier Optional, multiplier for your color to make it brighter.
 * @returns ColorType - Linear RGB values.
 * @author splashcard__ & scuffedItalian
 */
export function rgb(value: ColorType, colorMultiplier = 1) {
	if (!value[3]) value.push(255);
	else value[3] *= 255;
	return arrMul(value, colorMultiplier / 255).map(x => {
		return setDecimals(x, 3);
	}) as ColorType;
}

/**
 * A notesBetween variant that targets notes, arcs, and chains.
 * @param time The start time.
 * @param timeEnd The end time.
 * @param forAll The action to run on all filtered objects.
 */
export function allBetween(time: number, timeEnd: number, forAll: (n: Note) => void) {
	notesBetween(time, timeEnd, forAll);
	arcsBetween(time, timeEnd, forAll);
	chainsBetween(time, timeEnd, forAll);
}

/**
 * Copies the map to a new directory.
 * Useful for if you are working outside of the default BS game directory.
 * Make sure to run this after your map.save() or it won't transfer any of your changes.
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
export function MKLog(message: any, errorLevel?: "Warning" | "Error") {
	if (!errorLevel) {
		console.log(`[MapKey:   ${getSeconds()}s] ${message}`);
	}
	if (errorLevel == "Error") {
		console.log(`\x1b[31m[Error In MapKey: ${getSeconds()}s] ${message}\x1b[37m`);
	}
	if (errorLevel == "Warning") {
		console.log(`\x1b[33m[Warning In MapKey: ${getSeconds()}s] ${message}\x1b[37m`);
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
 * Finds the distance between 2 points.
 * @param point1 The first point.
 * @param point2 The second point.
 * @returns number - The distance between point1 and point2.
 */
export const distance = (point1: Vec3, point2: Vec3) => Math.hypot(...arrSubtract(point2, point1));

/**
 * Works the same way as rotatepoint but returns a keyframe, so you can replace a keyframe with this function.
 * @param pos The position/ point to be rotated.
 * @param rot The rotation of the point
 * @param anchor The optional anchor to add on top of the rotation.
 * @param frameTime The "time" value for the keyframe.
 * @param ease The optional easing of the keyframe.
 * @param spline The optional spline of the keyframe.
 * @returns Keyframe.
 */
export function rotatedKeyframe(pos: Vec3, rot: Vec3, anchor: Vec3, frameTime: number, ease?: EASE, spline?: "splineCatmullRom") {
	const point: Array<number | string> = rotatePoint(pos, rot, anchor).concat(frameTime);
	if (ease) point.push(ease);
	if (spline) point.push(spline);
	return point as [number, number, number, number, EASE?, "splineCatmullRom"?];
}

/**
 * Create a new array from a function of x. e.g arrFromFunction(10, x => { return 2 * x })
 * @param length The length of the arr.
 * @param func The function to run through the arr.
 * @returns arr
 */
export function arrFromFunction(length: number, func: (x: number) => number) {
	return Array.from(Array(length).keys()).map(x => {
		return func(x);
	});
}

export function shuffle<T extends number[]>(array: T, seed: number = Math.random()): T {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(seedRNG(0, 1, seed * Math.PI * (i + 1)) * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array as T;
}
