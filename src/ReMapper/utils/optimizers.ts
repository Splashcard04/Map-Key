import { activeDiffGet, copy, Environment, Geometry, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

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
 * Note, this function does not remove the track animations themselves. It's main purpose is to be used with the shareable env export function.
 * @param ObjectType Helps to narrow dowwn whether the function should look for envs or geo pieces.
 * @param id For environments, optional to add an id to help narrow the scope even more.
 */
export function staticEnvironmentOptimizer(ObjectType: "Environment" | "Geometry", id?: string) {
	if (ObjectType == "Environment") {
		if (id) {
			activeDiffGet().environment(arr => {
				arr.forEach((env: Environment) => {
					if (env.id == id) {
						activeDiffGet().animateTracks(animarr => {
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
								}
							});
						});
					}
				});
			});
		} else {
			activeDiffGet().environment(arr => {
				arr.forEach((env: Environment) => {
					activeDiffGet().animateTracks(animarr => {
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
							}
						});
					});
				});
			});
		}
	} else {
		activeDiffGet().geometry(arr => {
			arr.forEach((geo: Geometry) => {
				activeDiffGet().animateTracks(animarr => {
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
						}
					});
				});
			});
		});
	}
}
