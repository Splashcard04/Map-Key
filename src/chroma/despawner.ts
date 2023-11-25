import { MKCache, MKLog } from "../functions/general.ts";
import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";

/**
 * A function to aid in despawning multiple environment objects.
 * @param lookup The lookup method to use.
 * @param ids The ids to be despawned. This will use the position property on the objects, some object don't respond to the position property.
 * @param restore Will return objects to [0,0,0], does not work if hardDespawn is used.
 * @param hardDespawn The ids to be hard-despawned. This will sue the active property on the objects, all object respond to the active property. Objects will not be usable later if they are hard-despawned.
 */
export function despawn(lookup: LOOKUP, ids: string[] = [], restore?: string[], hardDespawn?: string[]) {
	ids.forEach(id => {
		const env = new Environment(id, lookup);
		env.position = [-9999, -9999, -9999];
		env.push();
	});
	hardDespawn?.forEach(hd => {
		const env = new Environment(hd, lookup);
		env.active = false;
		env.push();
	});
	restore?.forEach(res => {
		const env = new Environment(res, lookup);
		env.position = [0, 0, 0];
		env.active = true;
		env.push();
	});
	if (MKCache("Read", "logFunctions")) {
		MKLog(`New despawner using ${lookup} created.\nDespawning ${ids.length} environments...`);
	}
}
