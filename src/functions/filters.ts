import { Geometry, activeDiffGet, Environment, Note } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { MKCache, MKLog } from "./general.ts";

/**
 * Works like notesBetween, except it searches for geometry based on properties.
 * @param condition The condition that the geometry must pass to be affected.
 * @param action The action to run on all passing geometry.
 * @author Aurellis
 */
export function filterGeometry(condition: (x: Geometry) => boolean, action: (x: Geometry, index: number) => void) {
	let count = 0;
	activeDiffGet().geometry((arr: Geometry[]) => {
		arr.forEach((geo, i) => {
			if (condition(geo)) {
				action(geo, i);
				count++;
			}
		});
	});
	if (MKCache("Read", "logFunctions")) {
		MKLog(
			`Filtered ${activeDiffGet().geometry(arr => {
				arr.length;
			})} geometry... Objects found: ${count}...`
		);
	}
}

/**
 * Works like notesBetween, except it searches for environments based on properties.
 * @param condition The condition that the environments must pass to be affected.
 * @param action The action to run on all passing environments.
 * @author Aurellis
 */
export function filterEnvironments(condition: (X: Environment) => boolean, action: (x: Environment, index: number) => void) {
	let count = 0;
	activeDiffGet().environment((arr: Environment[]) => {
		arr.forEach((env, i) => {
			if (condition(env)) {
				action(env, i);
				count++;
			}
		});
	});
	if (MKCache("Read", "logFunctions")) {
		MKLog(
			`Filtered ${activeDiffGet().environment(arr => {
				arr.length;
			})} environments... Objects found: ${count}...`
		);
	}
}

/**
 * Works like notesBetween, except it searches based on certain properties.
 * @param fake Whether to check for fake notes, or regular notes.
 * @param condition The condition that the notes must pass to be affected.
 * @param action The action that will be run on all passing notes.
 */
export function filterNotes(fake: boolean, condition: (x: Note) => boolean, action: (x: Note, index: number) => void) {
	let count = 0;
	if (fake) {
		activeDiffGet().fakeNotes.forEach((note, i) => {
			if (condition(note)) {
				action(note, i);
				count++;
			}
		});
	} else {
		activeDiffGet().notes.forEach((note, i) => {
			if (condition(note)) {
				action(note, i);
				count++;
			}
		});
	}
	if (MKCache("Read", "logFunctions")) {
		MKLog(`Filtered ${activeDiffGet().fakeNotes.length + activeDiffGet().notes.length} notes... Notes found: ${count}...`);
	}
}
