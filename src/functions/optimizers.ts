import { activeDiffGet, copy, jsonRemove, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { filterGeometry, repeat } from "../../mod.ts";

/**
 * Returns if 2 arrs are identical, disregarding order.
 */
// deno-lint-ignore no-explicit-any
function duplicateArrsNoOrder<T extends any[]>(arr1: T, arr2: T) {
	if (arr1.length !== arr2.length) {
		return false;
	}
	arr1 = arr1.sort();
	arr2 = arr2.sort();
	return arr1.toString() == arr2.toString();
}

/**
 * Converts all identical materials on geometry into a single map-wide material.
 * @param namingMethod Decides the way to name the created materials. Defaults to numbered.
 */
export function optimizeMaterials() {
	activeDiffGet().geometry(arr => {
		let i = 0;
		arr.forEach(geo => {
			let copied = false;
			if (typeof geo.material !== "string") {
				const mat = copy(geo.material),
					name = `${i}`;
				geo.material = name;
				activeDiffGet().geometry(ray => {
					ray.forEach(x => {
						const xmat = x.material as RawGeometryMaterial;
						// Very ugly condition
						if (mat.shader == xmat.shader && mat.color?.toString() == xmat.color?.toString() && (xmat.shaderKeywords ? (mat.shaderKeywords ? duplicateArrsNoOrder(xmat.shaderKeywords, mat.shaderKeywords) : false) : !mat.shaderKeywords) && mat.track == xmat.track) {
							copied = true;
							x.material = name;
						}
					});
				});
				if (copied) {
					activeDiffGet().geoMaterials[name] = mat;
					i++;
				} else {
					geo.material = mat;
				}
			}
		});
	});
	// Optimize duplicate materials
	const matArr = Object.entries(activeDiffGet().geoMaterials),
		dupes: number[][] = [];
	repeat(matArr.length, i => {
		const mat = matArr[i][1];
		repeat(matArr.length, j => {
			const xmat = matArr[j][1];
			let proc = true;
			dupes.forEach(x => {
				if (x[0] == j) {
					proc = false;
				}
			});
			if (mat.shader == xmat.shader && mat.color?.toString() == xmat.color?.toString() && (xmat.shaderKeywords ? (mat.shaderKeywords ? duplicateArrsNoOrder(xmat.shaderKeywords, mat.shaderKeywords) : false) : !mat.shaderKeywords) && mat.track == xmat.track && i !== j && proc) {
				dupes.push([i, j]);
			}
		});
	});
	dupes.forEach(d => {
		filterGeometry(
			x => {
				return x.material == matArr[d[1]][0];
			},
			geo => {
				geo.material = matArr[d[0]][0];
			}
		);
		jsonRemove(activeDiffGet().geoMaterials, matArr[d[1]][0]);
	});
}

/**
 * Applies static animations from animateTracks at beat 0 to the data of the env/geo objects they affect.
 * @param deleteAnims (Default - true) deletes the track animations that are being converted over to the envs/geo.
 */
export function optimizeStaticEnvironment(deleteAnims = true) {
	let remArr: number[] = [];
	activeDiffGet().geometry(arr => {
		arr.forEach(geo => {
			activeDiffGet().animateTracks(animarr => {
				let i = 0;
				animarr.forEach(anim => {
					if (anim.track.has(geo.track.value.toString())) {
						if (anim.animate.position) {
							if (typeof anim.animate.position[0] == "number") {
								geo.json.position = anim.animate.position;
							}
						}
						if (anim.animate.rotation) {
							if (typeof anim.animate.rotation[0] == "number") {
								geo.json.rotation = anim.animate.rotation;
							}
						}
						if (anim.animate.scale) {
							if (typeof anim.animate.scale[0] == "number") {
								geo.json.scale = anim.animate.scale;
							}
						}
						delete geo.json.track;
						remArr.push(i);
					}
					i++;
				});
			});
		});
	});
	activeDiffGet().environment(arr => {
		arr.forEach(env => {
			activeDiffGet().animateTracks(animarr => {
				let i = 0;
				animarr.forEach(anim => {
					if (anim.track.has(env.track.value.toString())) {
						if (anim.animate.position) {
							if (typeof anim.animate.position[0] == "number") {
								env.json.position = anim.animate.position;
							}
						}
						if (anim.animate.rotation) {
							if (typeof anim.animate.rotation[0] == "number") {
								env.json.rotation = anim.animate.rotation;
							}
						}
						if (anim.animate.scale) {
							if (typeof anim.animate.scale[0] == "number") {
								env.json.scale = anim.animate.scale;
							}
						}
						delete env.json.track;
						remArr.push(i);
					}
					i++;
				});
			});
		});
	});
	if (deleteAnims) {
		remArr = Array.from(new Set(remArr));
		for (let i = remArr.length - 1; i >= 0; i--) {
			activeDiffGet().animateTracks(animarr => {
				animarr.splice(remArr[i], 1);
			});
		}
	}
}

export type optimizeFakeSettings = {
	notes?: boolean;
	bombs?: boolean;
	arcs?: boolean;
	chains?: boolean;
	walls?: boolean;
};

/**
 * Makes all objects that are set to uninteractable also be fake to save performance.
 * @param objects Change which objects to affect (all are set to true by default).
 */
export function optimizeFake(objects: optimizeFakeSettings = { notes: true, bombs: true, arcs: true, chains: true, walls: true }) {
	if (objects.notes) {
		let noteDelArr: number[] = [];
		let i = 0;
		activeDiffGet().notes.forEach(note => {
			if (note.interactable == false) {
				const nu = copy(note);
				nu.push(true);
				noteDelArr.push(i);
			}
			i++;
		});
		noteDelArr = Array.from(new Set(noteDelArr));
		for (let i = noteDelArr.length - 1; i >= 0; i--) {
			activeDiffGet().notes.splice(noteDelArr[i], 1);
		}
	}
	if (objects.bombs) {
		let bombDelArr: number[] = [];
		let i = 0;
		activeDiffGet().bombs.forEach(bomb => {
			if (bomb.interactable == false) {
				const nu = copy(bomb);
				nu.push(true);
				bombDelArr.push(i);
			}
			i++;
		});
		bombDelArr = Array.from(new Set(bombDelArr));
		for (let i = bombDelArr.length - 1; i >= 0; i--) {
			activeDiffGet().bombs.splice(bombDelArr[i], 1);
		}
	}
	if (objects.arcs) {
		let arcDelArr: number[] = [];
		let i = 0;
		activeDiffGet().arcs.forEach(arc => {
			if (arc.interactable == false) {
				const nu = copy(arc);
				nu.push(true);
				arcDelArr.push(i);
			}
			i++;
		});
		arcDelArr = Array.from(new Set(arcDelArr));
		for (let i = arcDelArr.length - 1; i >= 0; i--) {
			activeDiffGet().arcs.splice(arcDelArr[i], 1);
		}
	}
	if (objects.chains) {
		let chainDelArr: number[] = [];
		let i = 0;
		activeDiffGet().chains.forEach(chain => {
			if (chain.interactable == false) {
				const nu = copy(chain);
				nu.push(true);
				chainDelArr.push(i);
			}
			i++;
		});
		chainDelArr = Array.from(new Set(chainDelArr));
		for (let i = chainDelArr.length - 1; i >= 0; i--) {
			activeDiffGet().chains.splice(chainDelArr[i], 1);
		}
	}
	if (objects.walls) {
		let wallDelArr: number[] = [];
		let i = 0;
		activeDiffGet().walls.forEach(wall => {
			if (wall.interactable == false) {
				const nu = copy(wall);
				nu.push(true);
				wallDelArr.push(i);
			}
			i++;
		});
		wallDelArr = Array.from(new Set(wallDelArr));
		for (let i = wallDelArr.length - 1; i >= 0; i--) {
			activeDiffGet().walls.splice(wallDelArr[i], 1);
		}
	}
}
