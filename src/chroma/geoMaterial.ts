import { activeDiffGet, ColorType, RawGeometryMaterial } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
import { MKCache, MKLog } from "../functions/general.ts";
import { KeywordsBTSPillar, KeywordsBaseWater, KeywordsBillieWater, KeywordsInterscopeConcrete, KeywordsInterscopeCar, KeywordsStandard, KeywordsWaterfallMirror } from "../data/types.ts";

export class geometryMaterial {
	constructor(public name: string) {}
	public material: RawGeometryMaterial = { shader: "Standard" };
	set color(x) {
		this.material.color = x;
	}
	get color() {
		return this.material.color;
	}
	set track(x) {
		this.material.track = x;
	}
	get track() {
		return this.material.track;
	}
	set shader(x) {
		this.material.shader = x;
	}
	get shader() {
		return this.material.shader;
	}
	set shaderKeywords(x) {
		this.material.shaderKeywords = x;
	}
	get shaderKeywords() {
		return this.material.shaderKeywords;
	}
	BTSPillar(shaderKeywords?: KeywordsBTSPillar, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "BTSPillar";
		return this;
	}
	OpaqueLight(shaderKeywords?: string[], color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "OpaqueLight";
		return this;
	}
	TransparentLight(shaderKeywords?: string[], color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "TransparentLight";
		return this;
	}
	BaseWater(shaderKeywords?: KeywordsBaseWater, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "BaseWater";
		return this;
	}
	BillieWater(shaderKeywords?: KeywordsBillieWater, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "BillieWater";
		return this;
	}
	Standard(shaderKeywords?: KeywordsStandard, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "Standard";
		return this;
	}
	InterscopeConcrete(shaderKeywords?: KeywordsInterscopeConcrete, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "InterscopeConcrete";
		return this;
	}
	InterscopeCar(shaderKeywords?: KeywordsInterscopeCar, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "InterscopeCar";
		return this;
	}
	WaterfallMirror(shaderKeywords?: KeywordsWaterfallMirror, color?: ColorType, track?: string) {
		if (color) {
			this.color = color;
		}
		if (track) {
			this.track = track;
		}
		if (shaderKeywords) {
			this.shaderKeywords = shaderKeywords;
		}
		this.shader = "WaterfallMirror";
		return this;
	}
	/**Push the material to the active diff. */
	push() {
		activeDiffGet().geoMaterials[this.name] = this.material;

		if (MKCache("Read", "logFunctions")) {
			MKLog(`New Geometry Material titled ${this.name}`);
		}
	}
}
