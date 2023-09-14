import { activeDiff } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";

/**
 * log specific pieces of your map to the console
 * @param objects log object data to the console?
 * @param fakeArray log fake object data to the console?
 * @param moddedMapData log modded map data to the console?
 * @param graphs Whether to display graphs for the logged data.
 */
export function logMapData(objects = true, fakeArray = true, moddedMapData = true) {
	const map = activeDiff;
	console.log(`
	\x1b[3m ================ ${map.name} ================
	`);

	if (objects) {
		console.log(`\x1b[36m======== Object Data ========`, "\n", `\x1b[32mnotes: ${map.notes.length}\n walls: ${map.walls.length}\n bombs: ${map.bombs.length}\n arcs: ${map.arcs.length}\n chains: ${map.chains.length}`);
	}

	if (fakeArray) {
		console.log(`\x1b[36m======== Fake Array ========`, "\n", `\x1b[32mfake notes: ${map.fakeNotes.length}\n fake walls: ${map.fakeWalls.length}\n fake bombs: ${map.fakeBombs.length}\n fake chains: ${map.fakeChains.length}`);
	}

	if (moddedMapData) {
		let anims;
		map.animateTracks(arr => {
			anims = arr.length;
		});
		let paths;
		map.assignPathAnimations(arr => {
			paths = arr.length;
		});
		let parents;
		map.assignTrackParents(arr => {
			parents = arr.length;
		});
		let players;
		map.assignPlayerToTracks(arr => {
			players = arr.length;
		});
		console.log(`\x1b[36m======== Modded Map Data ========\n \x1b[32manimateTracks: ${anims}\n path animations: ${paths}\n parentTracks: ${parents}\n player tracks: ${players}\x1b[97m`);
	}
}
