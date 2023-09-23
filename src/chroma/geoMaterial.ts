import { activeDiffGet, ColorType, GEO_SHADER, GEO_TYPE, ModelScene, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { shaderKeywords } from "../data/types.ts";
import { MKCache, MKLog } from "../functions/general.ts";

export type addGroupSettings = {
	sceneName: ModelScene;
	blenderMatName: string;
	geoType: GEO_TYPE;
};

export class geometryMaterial {
	/**
	 * Creates a new geometry material with shader type and keywords.
	 * @param name The name of your material.
	 * @param material The material to create.
	 */

	constructor(public name: string) {}

	private material: RawGeometryMaterial = { shader: "Standard" };

	/**
	 * Set the shader for your material.
	 * @param shader The shader to apply.
	 */
	shader(shader: GEO_SHADER) {
		this.material.shader = shader;
		return this;
	}
	/**
	 * Set the color of your material.
	 * @param color The color to apply.
	 */
	color(color: ColorType) {
		this.material.color = color;
		return this;
	}
	/**
	 * Set the track of your material.
	 * @param track The track to apply.
	 */
	track(track: string) {
		this.material.track = track;
		return this;
	}

	/** Add shader keywords with autofill for your material shader.
	 * @param keywords The keywords to add. Formatted as {Shader: ["Keyword", "Keyword"]}
	 */
	shaderKeywords(keywords: shaderKeywords) {
		// A crappy workaround for shaderKeywords being potentially undefined.
		let tempKeywords: string[];
		if (!this.material.shaderKeywords) {
			tempKeywords = [];
		} else {
			tempKeywords = this.material.shaderKeywords;
		}
		Object.entries(keywords).forEach(entry => {
			entry.forEach(word => {
				if (typeof word !== "string") {
					word.forEach(key => {
						tempKeywords.push(key);
					});
				}
			});
		});
		this.material.shaderKeywords = tempKeywords;
		return this;
	}

	/**Push the material to the active diff (and primary group if applicable). */
	push() {
		activeDiffGet().geoMaterials[this.name] = this.material;

		if (MKCache("Read", "logFunctions")) {
			MKLog(`New Geometry Material titled ${this.name}`);
		}
	}
}
