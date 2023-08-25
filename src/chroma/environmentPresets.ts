import { Environment, Vec3 } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { despawner } from "../utils/despawner.ts";

export class environmentPreset {
	/**
	 * A class to aid in the quick setup of environments.
	 */
	constructor() {}
	/**
	 * Empties the BTS environment aside from the playersplace, HUD, and door.
	 * @param HUD Whether to include the HUD or not.
	 */
	emptyBTS(HUD?: boolean) {
		const ds = new despawner("Contains", ["Clouds", "PillarTrackLaneRingsR", "PillarPair", "TrackMirror", "SideLaser", "Construction"]);
		if (!HUD) {
			ds.ids.push("GameHUD");
		}
		ds.push();
		let env = new Environment("MagicDoorSprite", "Contains");
		env.position = [0, 0, 1000];
		env.scale = [0.1, 0.1, 0.1];
		env.push();

		env = new Environment("BloomL", "EndsWith");
		env.scale = [10000, 10000, 10000];
		env.push();
		env.id = "BloomR";
		env.push();
	}
	/**
	 * Create a horizon line with the BTS door.
	 * @param distance How far away the door should be.
	 * @param dupe Whether to duplicate the door to create the horizon or not.
	 */
	BTSDoorHorizon(distance = 1000, dupe?: boolean) {
		let env = new Environment("MagicDoorSprite", "Contains");
		if (dupe) {
			env.duplicate = 1;
		}
		env.position = [0, 0, distance];
		env.scale = [0.1, 0.1, 0.1];
		env.push();

		env = new Environment("BloomL", "EndsWith");
		env.scale = [10000, 10000, 10000];
		if (dupe) {
			env.duplicate = 1;
		}
		env.push();
		env.id = "BloomR";
		env.push();
	}
	/**
	 * Empty the Billie environment.
	 * @param sunPosition
	 * @param HUD
	 * @param Rain
	 * @param Background
	 * @param Clouds
	 */
	emptyBillie(sunPosition: Vec3 = [0, 100, 1000], HUD?: boolean, Rain?: boolean, Background = true, Clouds?: boolean) {
		const ds = new despawner(
			"Contains",
			["Mountains", "LeftRail", "RightRail", "LeftFarRail1", "LeftFarRail2", "RightFarRail1", "RightFarRail2", "RailingFullBack", "RailingFullFront", "LastRailingCurve", "LightRailingSegment", "BottomPairLasers", "BigSmokePS"],
			[],
			["WaterRainRipples", "RectangleFakeGlow", "Mirror", "Waterfall"]
		);
		if (!HUD) {
			ds.ids.push("NarrowGameHUD");
		}
		if (!Rain) {
			ds.ids.push("Rain");
		}
		if (!Background) {
			ds.hardDespawn?.push("BackgroundGradient");
		}
		if (!Clouds) {
			ds.ids.push("Clouds");
		}
		ds.push();
		const env = new Environment("Sun", "Contains");
		env.position = sunPosition;
		env.push();
	}
}
