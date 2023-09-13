import * as e from "https://deno.land/x/remapper@3.1.2/src/easings.ts";
import { ColorType, EASE, Event, LightID } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
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

	public lightType = 0;
	public lightID?: number | number[];
	public lerpType?: "HSV" | "RGB";
	public ease?: EASE;

	type(type = 0) {
		this.lightType = type;
		return this;
	}
	ID(id: number | number[]) {
		this.lightID = id;
		return this;
	}
	lerp(lerp: "HSV" | "RGB") {
		this.lerpType = lerp;
		return this;
	}
	easing(ease: EASE) {
		this.ease = ease;
		return this;
	}

	/**push the gradient to the difficulty */
	push() {
		const ev = new Event(this.time).backLasers().on(this.colors[0]);
		ev.type = this.lightType;
		ev.push();
		let i = 0;
		this.colors.forEach(color => {
			if (i !== 0) {
				const ev = new Event((i * this.duration) / (this.colors.length - 1)).backLasers().in(color);
				ev.type = this.lightType;
				if (this.ease) {
					ev.easing = this.ease;
				}
				if (this.lerpType) {
					ev.lerpType = this.lerpType;
				}
				ev.push();
			}
			i++;
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
			// "Activate" the import so it works
			e.easeInBack;
			t = eval(`e.${ease}(${i},${time},${duration},${duration * density})`);
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
			const off = new Event(time).backLasers().on([0, 0, 0, 0]);
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
