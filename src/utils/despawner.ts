import { logFunctionss, MKLog } from "./general.ts";
import { Environment, LOOKUP } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";

export class despawner {
	/**
	 * A class to aid in despawning multiple environment objects.
	 * @param lookup The lookup method to use.
	 * @param ids The ids to be despawned. This will use the position property on the objects, some object don't respond to the position property.
	 * @param restore Will return objects to [0,0,0], does not work if hardDespawn is used.
	 * @param hardDespawn The ids to be hard-despawned. This will sue the active property on the objects, all object respond to the active property. Objects will not be usable later if they are hard-despawned.
	 */
	constructor(public lookup: LOOKUP, public ids: string[] = [], public restore?: string[], public hardDespawn?: string[]) {
		this.lookup = lookup;
		this.ids = ids;
		this.restore = restore;
		this.hardDespawn = hardDespawn;
	}

	/**push despawned objects to the difficulty */
	push() {
		this.ids.forEach(id => {
			const env = new Environment(id, this.lookup);
			env.position = [-9999, -9999, -9999];
			env.push();
		});
		this.hardDespawn?.forEach(hd => {
			const env = new Environment(hd, this.lookup);
			env.active = false;
			env.push();
		});
		this.restore?.forEach(res => {
			const env = new Environment(res, this.lookup);
			env.position = [0, 0, 0];
			env.active = true;
			env.push();
		});
		if (logFunctionss) {
			MKLog(`New despawner using ${this.lookup} created.\nDespawning ${this.ids.length} environments...`);
		}
	}
}
