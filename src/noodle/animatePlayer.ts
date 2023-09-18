import { CustomEvent, CustomEventInternals, EASE, Note } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { allBetween, MKCache, MKLog } from "../functions/general.ts";
import { activeDiffGet } from "https://deno.land/x/remapper@3.1.2/src/beatmap.ts";
import { Vec3 } from "https://deno.land/x/remapper@3.1.2/src/general.ts";

export class playerAnim {
	/**
	 * A class to animate notes and the player at once.
	 * @param time The time to start animating the player.
	 * @param timeEnd The time to stop animating the player.
	 * @param animation Assign data to the track to assign player / notes to.
	 * @author Splashcard & Aurellis
	 */
	constructor(public time: number = 0, public timeEnd: number = 0, public animation?: (x: CustomEventInternals.AnimateTrack) => void, public playerTrack: string = "player", public noteTrack: string = "notes") {
		this.playerTrack = playerTrack;
		this.noteTrack = noteTrack;
	}

	/**Push the animation to the difficulty.*/
	push() {
		// Figure out how to check if a push() statement was included. Then MKLog a warning.

		if (this.animation) {
			const anim = new CustomEvent(this.time).animateTrack(this.playerTrack, this.timeEnd - this.time);
			this.animation(anim);
			anim.push();
		}

		new CustomEvent(this.time).assignPlayerToTrack(this.playerTrack).push();
		new CustomEvent(this.time).assignTrackParent([this.noteTrack], this.playerTrack).push();
		allBetween(this.time, this.timeEnd, (n: Note) => {
			n.track.add(this.noteTrack);
		});

		if (MKCache("Read", "logFunctions")) {
			MKLog(`Added new player animation at beat ${this.time} until beat ${this.timeEnd}...`);
		}
	}
}

export class animatePlayer {
	private json: { position: [number, number, number, number, EASE?, "splineCatmullRom"?][]; rotation: [number, number, number, number, EASE?, "splineCatmullRom"?][]; lastBeat: number } = { position: [], rotation: [], lastBeat: 0 };
	/**
	 * Animates the player over the course of your map.
	 * @param playerTrack (Default - "player") The track to assign the player to.
	 * @param noteTrack (Default - "notes") The track to assign the notes and other objects to.
	 * @param affectFake (Default - false) Whether or not to affect fake objects too.
	 */
	constructor(public playerTrack = "player", public noteTrack = "notes", public affectFake = false) {}
	/**
	 * Add an animation to your player.
	 * @param time The time of the animation.
	 * @param duration The duration of the animation.
	 * @param animation The animation data to add, only position, rotation, and length properties are considered. DO NOT PUSH THE ANIMATION YOU ADD HERE!
	 */
	addAnimation(time: number, duration: number, animation: (x: CustomEventInternals.AnimateTrack) => void) {
		const anim = new CustomEvent().animateTrack();
		animation(anim);
		if (typeof anim.animate.position[0] == "number") {
			const pos = anim.animate.position as Vec3;
			anim.animate.position = [[pos[0], pos[1], pos[2], 0, "easeStep"]];
		}
		if (typeof anim.animate.rotation[0] == "number") {
			const rot = anim.animate.rotation as Vec3;
			anim.animate.rotation = [[rot[0], rot[1], rot[2], 0, "easeStep"]];
		}
		// Transform times to 0-1
		if (anim.animate.length) {
			const pos = anim.animate.position as [number, number, number, number, EASE?, "splineCatmullRom"?][];
			pos.forEach(x => {
				x[3] = x[3] / anim.animate.length;
			});
			const rot = anim.animate.rotation as [number, number, number, number, EASE?, "splineCatmullRom"?][];
			rot.forEach(x => {
				x[3] = x[3] / anim.animate.length;
			});
		}

		// Rework timings based on time + duration
		const pos = anim.animate.position as [number, number, number, number, EASE?, "splineCatmullRom"?][],
			rot = anim.animate.rotation as [number, number, number, number, EASE?, "splineCatmullRom"?][];

		pos.forEach(x => {
			x[3] = time + x[3] * duration;
		});
		rot.forEach(x => {
			x[3] = time + x[3] * duration;
		});

		// Add steps where needed

		pos[0][4] = "easeStep";
		rot[0][4] = "easeStep";

		// Calculate final beat
		if (this.json.lastBeat < time + duration) {
			this.json.lastBeat = time + duration;
		}

		// Push
		pos.forEach(x => {
			this.json.position.push(x);
		});
		rot.forEach(x => {
			this.json.rotation.push(x);
		});
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
	}
}
