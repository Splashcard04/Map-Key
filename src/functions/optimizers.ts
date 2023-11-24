import { activeDiffGet, copy, EventInternals, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { filterGeometry, repeat } from "../../mod.ts";

/**
 * Returns if 2 arrs are identical, disregarding order.
 */
// deno-lint-ignore no-explicit-any
function duplicateArrsNoOrder<T extends any[]>(arr1: T, arr2: T) {
	arr1 = arr1.sort();
	arr2 = arr2.sort();
	return arr1.toString() == arr2.toString();
}

function identicalMaterials(mat1: RawGeometryMaterial | string = { shader: "BTSPillar" }, mat2: RawGeometryMaterial | string = { shader: "BTSPillar" }) {
	if (typeof mat1 == "string" || typeof mat2 == "string") {
		return mat1 == mat2;
	} else {
		return mat1.shader == mat2.shader && mat1.color?.toString() == mat2.color?.toString() && (mat2.shaderKeywords ? (mat1.shaderKeywords ? duplicateArrsNoOrder(mat2.shaderKeywords, mat1.shaderKeywords) : false) : !mat1.shaderKeywords) && mat1.track == mat2.track;
	}
}

/**
 * Performs several actions on geometry materials across the map.
 * - Merges all duplicate materials.
 * - Renames all materials to numbers.
 * - Moves duplicate materials on geometry into map-wide materials.
 */
export function optimizeMaterials() {
	// Convert all existing mat names into numbers
	let tempMat: Record<string, RawGeometryMaterial> = {},
		matArr = Object.entries(activeDiffGet().geoMaterials);
	repeat(matArr.length, i => {
		tempMat[i] = matArr[i][1];
		activeDiffGet().geometry(arr => {
			arr.forEach(x => {
				if (x.material == matArr[i][0]) {
					x.material = i.toString();
				}
			});
		});
	});
	activeDiffGet().geoMaterials = tempMat;

	// Convert all duplicate JSON materials into strings
	let i = matArr.length,
		j = 0,
		k = 0;
	activeDiffGet().geometry(arr => {
		arr.forEach(x => {
			let duped = false;
			if (typeof x.material !== "string") {
				activeDiffGet().geometry(arr2 => {
					arr2.forEach(y => {
						if (typeof y.material !== "string" && identicalMaterials(x.material, y.material) && j !== k) {
							duped = true;
							activeDiffGet().geoMaterials[i] = x.material as RawGeometryMaterial;
							y.material = i.toString();
						}
						k++;
					});
				});
			}
			if (duped) {
				x.material = i.toString();
				i++;
			}
			j++;
		});
	});

	// Merge all duplicate materials
	matArr = Object.entries(activeDiffGet().geoMaterials);
	const dupes: number[][] = [];
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
			if (identicalMaterials(mat, xmat) && i !== j && proc) {
				dupes.push([i, j]);
			}
		});
	});
	dupes.forEach(d => {
		filterGeometry(
			x => x.material == matArr[d[1]][0],
			geo => {
				geo.material = matArr[d[0]][0];
			}
		);
		delete activeDiffGet().geoMaterials[matArr[d[1]][0]];
	});
	// Renumber the materials
	tempMat = {};
	matArr = Object.entries(activeDiffGet().geoMaterials);
	repeat(matArr.length, i => {
		tempMat[i] = matArr[i][1];
		activeDiffGet().geometry(arr => {
			arr.forEach(x => {
				if (x.material == matArr[i][0]) {
					x.material = i.toString();
				}
			});
		});
	});
	activeDiffGet().geoMaterials = tempMat;
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

function duplicateEventsNoId(ev1: EventInternals.AbstractEvent, ev2: EventInternals.AbstractEvent) {
	ev1 = copy(ev1);
	ev2 = copy(ev2);
	ev1.lightID = [];
	ev2.lightID = [];
	return `${ev1}` == `${ev2}`;
}

/**
 * Deletes all duplicate events and merges events that differ only in lightIDs.
 */
export function optimizeIdenticalEvents() {
	const events = copy(activeDiffGet().events);
	repeat(events.length, i => {
		repeat(events.length, j => {
			if (duplicateEventsNoId(events[i], events[j]) && i !== j) {
				events[i].lightID = typeof events[i].lightID == "number" ? [events[i].lightID as number] : events[i].lightID;
				events[j].lightID = typeof events[j].lightID == "number" ? [events[j].lightID as number] : events[j].lightID;
				events[i].lightID = [...(events[i].lightID as number[]), ...(events[j].lightID as number[])];
				events[j].time = -Infinity;
			}
		});
	});
	activeDiffGet().events = [...new Set(events.filter(e => e.time !== -Infinity))];
}
