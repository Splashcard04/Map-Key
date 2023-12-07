import { Seed } from "https://deno.land/x/seed@1.0.0/index.ts";
import { Vec2, copy, setDecimals } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { makeNoise2D, makeNoise3D, makeNoise4D } from "https://deno.land/x/open_simplex_noise@v2.5.0/mod.ts";
import { MKLog, repeat } from "./general.ts";
import { arrFromFunction } from "../../mod.ts";

export class randArray {
	/**
	 * Creates an array of random numbers with a seed for reproducible results.
	 * @param seed The seed for prng generation, leave blank to keep random.
	 * @param range The min/max that the numbers in the array can be.
	 * @param length The length of the array (how many numbers to generate).
	 * @param decimals The precision of the result (0 for integers).
	 */
	constructor(public seed: number | string = Math.random(), public range: Vec2 = [0, 1], public length = 2, public decimals = 5) {}
	/**
	 * Creates the array based on set parameters.
	 * @returns An array of random values.
	 */
	run() {
		return arrFromFunction(this.length, x => setDecimals(seedRNG(this.range[0], this.range[1], `${this.seed}blahblah${x}`), this.decimals));
	}
	/**
	 * Ensures that no two numbers in the array are identical. This is the slowest method on this class. Please only use it if you must.
	 * @param buffer The number of times to try for a unique number (prevents infinite repeats under certain circumstances).
	 * @returns An array of random values.
	 */
	runUnique(buffer = this.length) {
		const res: number[] = [];
		repeat(this.length, i => {
			let unique = false,
				att = NaN;
			for (let j = 0; j < buffer && !unique; j++) {
				att = setDecimals(seedRNG(this.range[0], this.range[1], `${this.seed}blah${i}blah${j}`), this.decimals);
				unique = true;
				res.forEach(x => {
					if (x == att) {
						unique = false;
					}
				});
			}
			if (!unique) {
				MKLog(`Failed to find unique number for randArray, using ${att} in index [${i}] instead...`, "Error");
			}
			res.push(att);
		});
		return res;
	}
	/**
	 * Ensures that no consecutive numbers are identical.
	 * @param gap The number of indexes before allowing an identical number.
	 * @param buffer The number of times to try for a unique number (prevents infinite repeats under certain circumstances).
	 * @returns An array of random values.
	 */
	runUniqueConsecutive(gap = 1, buffer = this.length) {
		const res: number[] = [],
			prev: number[] = [];
		repeat(gap, () => {
			prev.push(NaN);
		});
		repeat(this.length, i => {
			let unique = false,
				att = NaN;
			for (let j = 0; j < buffer && !unique; j++) {
				att = setDecimals(seedRNG(this.range[0], this.range[1], `${this.seed}blah${i}blah${j}`), this.decimals);
				unique = true;
				repeat(prev.length, i => {
					if (att == prev[i]) {
						unique = false;
					}
				});
			}
			if (!unique) {
				MKLog(`Failed to find unique number for randArray, using ${att} in index [${i}] instead...`, "Error");
			}
			res.push(att);
			prev.push(att);
			prev.shift();
		});
		return res;
	}
}

export class Noise {
	/**
	 * Creates a noise map with a seed. Noise values range from roughly -0.9 to 0.9.
	 * @param seed The seed for the noise (leave blank for random).
	 */
	constructor(public seed: number = Date.now()) {}
	/**
	 * Get the value at a 2D point in the noise.
	 * @param coord The point to get the value from.
	 * @param range The optional min and max to generate noise values.
	 * @returns The value at the point.
	 */
	point2D(coord: [number, number], range?: [number, number]) {
		const init = makeNoise2D(this.seed);
		return range ? ((init(coord[0], coord[1]) + 0.9) * (range[1] - range[0])) / 1.8 + range[0] : init(coord[0], coord[1]);
	}
	/**
	 * Get the value at a 3D point in the noise.
	 * @param coord The point to get the value from.
	 * @param range The optional min and max to generate noise values.
	 * @returns The value at the point.
	 */
	point3D(coord: [number, number, number], range?: [number, number]) {
		const init = makeNoise3D(this.seed);
		return range ? ((init(coord[0], coord[1], coord[2]) + 0.9) * (range[1] - range[0])) / 1.8 + range[0] : init(coord[0], coord[1], coord[2]);
	}
	/**
	 * Get the value at a 4D point in the noise.
	 * @param coord The point to get the value from.
	 * @param range The optional min and max to generate noise values.
	 * @returns The value at the point.
	 */
	point4D(coord: [number, number, number, number], range?: [number, number]) {
		const init = makeNoise4D(this.seed);
		return range ? ((init(coord[0], coord[1], coord[2], coord[3]) + 0.9) * (range[1] - range[0])) / 1.8 + range[0] : init(coord[0], coord[1], coord[2], coord[3]);
	}
}

/**
 * Random number generator with optional seed for reproducible results.
 * @param min The minimun possible number to generate (inclusive).
 * @param max The maximum possible number to generate (exclusive).
 * @param seed The optional seed to apply to the generator (leave blank for random).
 * @returns Random number.
 * @author Aurellis
 */
export function seedRNG(min: number, max: number, seed: number | string = Math.random()) {
	[min, max] = min > max ? [max, min] : [min, max];
	return new Seed(seed.toString()).randomFloat(min, max);
}

/**
 * Display graphically, the distribution of an array. If unusual spikes appear on the graph (generally the same length and at regular intervals) it is likely that the total length of the array divides poorly into the graph lines. You can fix this by increasing the size of the array or changing the points value.
 * @param arr The array of values to convert to a distribution graph.
 * @param points The number of graph lines to show.
 * @param magnitude The maximum length of the graph lines. The higher this value is set, the more accurate the lower graph bars will be. Setting it too high may cause unintended text wrapping.
 */
export function graphDistribution(arr: number[], points: number, magnitude: number) {
	// Convert the array to 0-1.
	let max = copy(arr);
	max.sort((a, b) => {
		if (a > b) {
			return 1;
		}
		if (a < b) {
			return -1;
		}
		return 0;
	});
	arr = arr.map(x => {
		return (x - max[0]) / (max[max.length - 1] - max[0]);
	});
	// Round to the nearest value for points
	arr = arr.map(x => {
		return Math.floor(x * points) / points;
	});
	// Create an array for every instance of a point value.
	let length: number[] = [];
	repeat(points, point => {
		let layer = 0;
		arr.forEach(x => {
			if (x == point / points) {
				layer++;
			}
		});
		length.push(layer);
	});
	// Find the longest line in the graph
	max = copy(length);
	max.sort((a, b) => {
		if (a > b) {
			return 1;
		}
		if (a < b) {
			return -1;
		}
		return 0;
	});
	// Normalise the array based on the longest line and magnitude
	length = length.map(x => {
		return Math.floor((x * magnitude) / max[max.length - 1]);
	});
	// Convert the array to a string of | and log them.
	length.forEach(val => {
		const out: string[] = [];
		repeat(val, () => {
			out.push("|");
		});
		console.log(out.toString().replace(/,/g, ""));
	});
}
