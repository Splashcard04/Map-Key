import { notesBetween, Note, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { logFunctionss, MKLog } from "./general.ts";

export class notePath {
	json: Json = {};

	import(json: Json) {
		this.json = json;
		return this;
	}
	/**
	 * @param time The time to start applying the custom data to the notes.
	 * @param timeEnd The time to stop applying custom data to the notes.
	 * @param fornoteLeft Pass for all left notes.
	 * @param forNoteRight Pass for all right notes.
	 * @author splashcard
	 */
	constructor(time: number, timeEnd: number, fornoteLeft: (n: Note) => void, forNoteRight: (n: Note) => void) {
		this.json.time = time;
		this.json.timeEnd = timeEnd;
		this.json.forL = fornoteLeft;
		this.json.forR = forNoteRight;
	}
	/**push the note effects to the difficulty */
	push() {
		notesBetween(this.json.time, this.json.timeEnd, n => {
			let pass = false;
			if (n.type === 0) {
				pass = true;
			} else {
				pass = false;
			}
			if (pass) this.json.forL(n);
		});
		notesBetween(this.json.time, this.json.timeEnd, n => {
			let pass = false;
			if (n.type === 1) {
				pass = true;
			} else {
				pass = false;
			}
			if (pass) this.json.forR(n);
		});

		if (logFunctionss) {
			MKLog(`Added new split note path at ${this.json.time} ending at ${this.json.timeEnd}...`);
		}
	}
}
