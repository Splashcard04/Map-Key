import { activeDiffGet, copy, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

export type materialNamingMethods = "Numbered" | "By Properties" | "Geometry Type Numbered" | "Shader Numbered";

/**
 * Converts all identical materials on geometry into a single map-wide material.
 * @param namingMethod Decides the way to name the created materials. Defaults to numbered.
 */
export function optimizeMaterials(namingMethod: materialNamingMethods = "Numbered") {
	activeDiffGet().geometry(arr => {
		let i = 0;
		arr.forEach(geo => {
			let copied = false;
			if (typeof geo.material !== "string") {
				const mat = copy(geo.material);
				let name: string;
				if (namingMethod == "By Properties") {
					name = `${mat.color?.join()}${mat.shader}${mat.shaderKeywords?.join()}${mat.track}`;
				} else if (namingMethod == "Geometry Type Numbered") {
					name = `${geo.type}${i}`;
				} else if (namingMethod == "Shader Numbered") {
					name = `${mat.shader}${i}`;
				} else {
					name = i.toString();
				}
				geo.material = name;
				activeDiffGet().geometry(ray => {
					ray.forEach(x => {
						const xmat = x.material as RawGeometryMaterial;
						if (mat.shader == xmat.shader && mat.color == xmat.color && mat.shaderKeywords == xmat.shaderKeywords && mat.track == xmat.track) {
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
}

/**
 * Applies static animations from animateTracks at beat 0 to the data of the env/geo objects they affect.
 * @param deleteAnims (Default - true) deletes the track animations that are being converted over to the envs/geo.
 */
export function staticEnvironmentOptimizer(deleteAnims = true) {
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
