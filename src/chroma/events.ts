import { ColorType, EASE, Event, LightID, copy, lerp } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { repeat } from "../functions/general.ts";

export class lightGradient {
	/**
	 * Create simple lighting gradients.
	 * @param time The time to start the gradient.
	 * @param duration The duration of the gradient.
	 * @param type The light type to use.
	 * @param colors The colors to include in the gradient.
	 * @param lerpType The color lerp to use.
	 * @param easing The easing to use on each color.
	 */
	constructor(public time = 0, public duration = 1, public colors: ColorType[]) {}

	private lightType = 0;
	private lightID?: number | number[];
	private lerpType?: "HSV" | "RGB";
	private ease?: EASE;

	/**
	 * Set the lightType
	 * @param type The lightType to run the event on.
	 */
	type(type = 0) {
		this.lightType = type;
		return this;
	}
	/**
	 * Set the lightID/s
	 * @param id The light ids to run the event on.
	 */
	ID(id: number | number[]) {
		this.lightID = id;
		return this;
	}
	/**
	 * Set the lerp type.
	 * @param lerp Either lerp by HSV or RGB.
	 */
	lerp(lerp: "HSV" | "RGB") {
		this.lerpType = lerp;
		return this;
	}
	/**
	 * Set the easing for each transition.
	 * @param ease The easing.
	 */
	easing(ease: EASE) {
		this.ease = ease;
		return this;
	}

	/**push the gradient to the difficulty
	 * @param dupe Whether to copy the class on push.
	 */
	push(dupe = true) {
		const temp = dupe ? copy(this) : this,
			ev = new Event(temp.time).backLasers().on(temp.colors[0]);
		ev.type = temp.lightType;
		if (temp.lightID) {
			ev.lightID = temp.lightID;
		}
		ev.push();
		temp.colors.forEach((color, i) => {
			if (i !== 0) {
				const ev = new Event((i * temp.duration) / (temp.colors.length - 1) + temp.time).backLasers().in(color);
				ev.type = temp.lightType;
				if (temp.ease) {
					ev.easing = temp.ease;
				}
				if (temp.lerpType) {
					ev.lerpType = temp.lerpType;
				}
				if (temp.lightID) {
					ev.lightID = temp.lightID;
				}
				ev.push();
			}
		});
	}
}

/**
 * Creates a strobe sequence. With `density` number of events every beat.
 * @param time The time to start the strobe.
 * @param duration The duration of the strobe.
 * @param density How many times per beat to add a strobe event, or one event every 1/density beats.
 * @param type The event type to use.
 * @param color The on color to use, the off color will always be [0,0,0,0]. Can also be a boolean to use vanilla colors.
 * @param ids Specific ids to target.
 * @param ease Whether to use an easing on the strobe. Any special easings like, bounce, elastic, etc... will yield very weird results.
 * @author Splashcard & Aurellis
 */
export function strobeGenerator(time: number, duration: number, density = 1, type = 0, color: ColorType | boolean = true, ids?: LightID, ease?: EASE) {
	repeat(duration * density, i => {
		let t = 0;
		if (ease) {
			t = lerp(time, time + duration, i / (duration * density), ease);
		} else {
			t = time + i / density;
		}
		if (i % 2 == 0) {
			const on = new Event(t).backLasers().on(color);
			if (ids) {
				on.lightID = ids;
			}
			if (type) {
				on.type = type;
			}
			on.push();
		} else {
			const off = new Event(t).backLasers().on([0, 0, 0, 0]);
			if (ids) {
				off.lightID = ids;
			}
			if (type) {
				off.type = type;
			}
			off.push();
		}
	});
}
