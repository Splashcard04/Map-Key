import { CustomEvent, CustomEventInternals, EASE } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { MKCache, MKLog } from "../functions/general.ts";
import { activeDiffGet } from "https://deno.land/x/remapper@3.1.2/src/beatmap.ts";
import { Vec3 } from "https://deno.land/x/remapper@3.1.2/src/general.ts";

type fakeKeyFrame = [number, number, number, number, EASE?, "splineCatmullRom"?];

export class playerAnimation {
	private json: { position: fakeKeyFrame[]; rotation: fakeKeyFrame[]; lastBeat: number } = { position: [[0, 0, 0, 0]], rotation: [[0, 0, 0, 0]], lastBeat: 0 };
	/**
	 * Animates the player over the course of your map.
	 * @param playerTrack (Default - "player") The track to assign the player to.
	 * @param noteTrack (Default - "notes") The track to assign the notes and other objects to.
	 * @param affectFake (Default - false) Whether or not to affect fake objects too.
	 */
	constructor(private playerTrack = "player", private noteTrack = "notes", private affectFake = false) {}
	/**
	 * Add an animation to your player.
	 * @param time The time of the animation.
	 * @param duration The duration of the animation.
	 * @param animation The animation data to add, only position, rotation, and length properties are considered. DO NOT PUSH THE ANIMATION YOU ADD HERE!
	 */
	addAnimation(time: number, duration: number, animation: (x: CustomEventInternals.AnimateTrack) => void) {
		const anim = new CustomEvent().animateTrack();
		animation(anim);

		// Pos stuff
		if (anim.animate.position) {
			// Make everything a keyframe
			let pos = anim.animate.position;
			if (typeof anim.animate.position[0] == "number") {
				const temp = anim.animate.position as Vec3;
				pos = [[temp[0], temp[1], temp[2], 0, "easeStep"]];
			}

			pos = pos as fakeKeyFrame[];

			// Transform times to 0-1
			if (anim.animate.length) {
				pos.forEach(x => {
					x[3] = x[3] / anim.animate.length;
				});
			}

			// Rework timings based on time + duration
			pos.forEach(x => {
				x[3] = time + x[3] * duration;
			});

			// Add steps where needed
			pos[0][4] = "easeStep";

			// Push
			pos.forEach(x => {
				this.json.position.push(x as fakeKeyFrame);
			});
		}

		// Rot stuff
		if (anim.animate.rotation) {
			// Make everything a keyframe
			let rot = anim.animate.rotation;
			if (typeof anim.animate.rotation[0] == "number") {
				const temp = anim.animate.rotation as Vec3;
				rot = [[temp[0], temp[1], temp[2], 0, "easeStep"]];
			}

			rot = rot as fakeKeyFrame[];

			// Transform times to 0-1
			if (anim.animate.length) {
				rot.forEach(x => {
					x[3] = x[3] / anim.animate.length;
				});
			}

			// Rework timings based on time + duration

			rot.forEach(x => {
				x[3] = time + x[3] * duration;
			});

			// Add steps where needed

			rot[0][4] = "easeStep";

			// Push
			rot.forEach(x => {
				this.json.rotation.push(x as fakeKeyFrame);
			});
		}

		// Calculate final beat
		if (this.json.lastBeat < time + duration) {
			this.json.lastBeat = time + duration;
		}

		return this;
	}
	/**
	 * Pushes your player animation to the active difficulty. If you included a push() statement in the addAnimation() sections, it will get duplicated and the animation will be broken.
	 */
	push() {
		activeDiffGet().notes.forEach(x => {
			x.track.add(this.noteTrack);
		});
		activeDiffGet().bombs.forEach(x => {
			x.track.add(this.noteTrack);
		});
		activeDiffGet().arcs.forEach(x => {
			x.track.add(this.noteTrack);
		});
		activeDiffGet().chains.forEach(x => {
			x.track.add(this.noteTrack);
		});
		if (this.affectFake) {
			activeDiffGet().fakeBombs.forEach(x => {
				x.track.add(this.noteTrack);
			});
			activeDiffGet().fakeChains.forEach(x => {
				x.track.add(this.noteTrack);
			});
			activeDiffGet().fakeNotes.forEach(x => {
				x.track.add(this.noteTrack);
			});
		}
		new CustomEvent().assignPlayerToTrack(this.playerTrack).push();
		new CustomEvent().assignTrackParent([this.noteTrack], this.playerTrack).push();
		const anim = new CustomEvent().animateTrack(this.playerTrack, this.json.lastBeat);
		anim.animate.length = this.json.lastBeat;
		anim.animate.position = this.json.position;
		anim.animate.rotation = this.json.rotation;
		anim.push();

		if (MKCache("Read", "logFunctions")) {
			MKLog(`Added new player animation with ${anim.animate.position.length + anim.animate.rotation.length} keyframes...`);
		}
	}
}
