import { ModelScene, GroupObjectTypes, Environment, Geometry, Json, copy } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";

export class laserScene {
	json: Json = {};
	import(json: Json) {
		this.json = json;
		return this;
	}
	/**
	 * @param scene the model scene to add the lasers to
	 * @param object the laser that you would like to place (environment or geometry)
	 * @method modify the modifications (lightID, lightType, etc.) for your lasers
	 * @method matName the name of your material in blender
	 * @method amount the amount of laser objects in you rmodel scene
	 * @method push add the lasers to a primary group
	 */
	constructor(public scene: ModelScene, public object: GroupObjectTypes) {}
	/**pass a variable to modify your laser objects in any way */
	modify(envMod: (x: Environment | Geometry) => void) {
		this.json.mod = envMod;
		return this;
	}
	/**the name of your blender material */
	matName(name: string) {
		this.json.mat = name;
		return this;
	}
	amount(amount: number) {
		this.json.amt = amount;
		return this;
	}
	/**add the lasers to the primary group.
	 * @param dupe Whether to copy the class on push.
	 */
	push(dupe = true) {
		const temp = dupe ? copy(this) : this,
			laserMats: string[] = [],
			obj = this.object;
		temp.json.mod(obj);
		for (let i = 0; i < temp.json.amt; i++) {
			laserMats.push(temp.json.mat + i.toString());
		}
		temp.scene.addPrimaryGroups(laserMats, obj);
	}
}
