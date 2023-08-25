export type GEO_FILTER_PROPS = "track" | "position" | "rotation" | "scale" | "type" | "material" | "position[0]" | "position[1]" | "position[2]" | "rotation[0]" | "rotation[1]" | "rotation[2]" | "scale[0]" | "scale[1]" | "scale[2]";

export type ENV_FILTER_PROPS = "track" | "position" | "rotation" | "scale" | "id" | "lookupMethod" | "position[0]" | "position[1]" | "position[2]" | "rotation[0]" | "rotation[1]" | "rotation[2]" | "scale[0]" | "scale[1]" | "scale[2]";

export type NOTE_FILTER_PROPS =
	| "time"
	| "type"
	| "track"
	| "x"
	| "y"
	| "direction"
	| "fake"
	| "interactable"
	| "color"
	| "color[0]"
	| "color[1]"
	| "color[2]"
	| "color[3]"
	| "rotation"
	| "rotation[0]"
	| "rotation[1]"
	| "rotation[2]"
	| "localRotation"
	| "localRotation[0]"
	| "localRotation[1]"
	| "localRotation[2]"
	| "offset"
	| "NJS";

// to use with params in the filter functions
export enum position {
	x = "position[0]",
	y = "position[1]",
	z = "position[2]"
}

export enum rotation {
	pitch = "rotation[0]",
	yaw = "rotation[1]",
	roll = "rotation[2]"
}

export enum localRotation {
	pitch = "localRotation[0]",
	yaw = "localRotation[1]",
	roll = "localRotation[2]"
}

export enum scale {
	x = "scale[0]",
	y = "scale[1]",
	z = "scale[2]"
}

export enum lightTypes {
	/**light type constants as a solution to ReMapper's horrible event system */
	backLasers = 0,
	ringLights = 1,
	leftLasers = 2,
	rightLasers = 3,
	centerLasers = 4,
	extraLeft = 6,
	extraRight = 7,
	billieLeft = 10,
	billieRight = 11,
	gagaLeft = 18,
	gagaRight = 19
}

export type shaderKeywords = {
	BaseWater?: Array<
		| "FOG"
		| "HEIGHT_FOG"
		| "INVERT_RIMLIGHT"
		| "MASK_RED_IS_ALPHA"
		| "NOISE_DITHERING"
		| "NORMAL_MAP"
		| "REFLECTION_PROBE"
		| "REFLECTION_PROBE_BOX_PROJECTION"
		| "_DECALBLEND_ALPHABLEND"
		| "_DISSOLVEAXIS_LOCALX"
		| "_EMISSIONCOLORTYPE_FLAT"
		| "_EMISSIONTEXTURE_NONE"
		| "_RIMLIGHT_NONE"
		| "_ROTATE_UV_NONE"
		| "_VERTEXMODE_NONE"
		| "_WHITEBOOSTTYPE_NONE"
		| "_ZWRITE_ON"
	>;
	BillieWater?: Array<
		| "FOG"
		| "HEIGHT_FOG"
		| "INVERT_RIMLIGHT"
		| "MASK_RED_IS_ALPHA"
		| "NOISE_DITHERING"
		| "NORMAL_MAP"
		| "REFLECTION_PROBE"
		| "REFLECTION_PROBE_BOX_PROJECTION"
		| "_DECALBLEND_ALPHABLEND"
		| "_DISSOLVEAXIS_LOCALX"
		| "_EMISSIONCOLORTYPE_FLAT"
		| "_EMISSIONTEXTURE_NONE"
		| "_RIMLIGHT_NONE"
		| "_ROTATE_UV_NONE"
		| "_VERTEXMODE_NONE"
		| "_WHITEBOOSTTYPE_NONE"
		| "_ZWRITE_ON"
	>;
	BTSPillar?: Array<"DIFFUSE" | "ENABLE_DIFFUSE" | "ENABLE_FOG" | "ENABLE_HEIGHT_FOG" | "ENABLE_SPECULAR" | "FOG" | "HEIGHT_FOG" | "REFLECTION_PROBE_BOX_PROJECTION" | "SPECULAR" | "_EMISSION" | "_ENABLE_FOG_TINT" | "_RIMLIGHT_NONE">;
	InterscopeCar?: Array<
		| "ENABLE_DIFFUSE"
		| "ENABLE_DIRT"
		| "ENABLE_DIRT_DETAIL"
		| "ENABLE_FOG"
		| "ENABLE_GROUND_FADE"
		| "ENABLE_SPECULAR"
		| "ENABLE_VERTEX_COLOR"
		| "FOG"
		| "INVERT_RIM_DIM"
		| "REFLECTION_PROBE"
		| "REFLECTION_PROBE_BOX_PROJECTION"
		| "REFLECTION_PROBE_BOX_PROJECTION_OFFSET"
		| "SPECULAR_ANTIFLICKER"
		| "_EMISSION"
		| "_EMISSIONCOLORTYPE_WHITEBOOST"
		| "_EMISSIONTEXTURE_NONE"
		| "_ENABLE_FOG_TINT"
		| "_RIMLIGHT_NONE"
		| "_VERTEXMODE_METALSMOOTHNESS"
		| "_WHITEBOOSTTYPE_NONE"
	>;
	InterscopeConcrete?: Array<
		| "DIRT"
		| "ENABLE_DIFFUSE"
		| "ENABLE_DIRT"
		| "ENABLE_DIRT_DETAIL"
		| "ENABLE_FOG"
		| "ENABLE_GROUND_FADE"
		| "ENABLE_SPECULAR"
		| "ENABLE_VERTEX_COLOR"
		| "FOG"
		| "LIGHTMAP"
		| "NOISE_DITHERING"
		| "REFLECTION_PROBE"
		| "REFLECTION_PROBE_BOX_PROJECTION"
		| "REFLECTION_PROBE_BOX_PROJECTION_OFFSET"
		| "_EMISSION"
		| "_ENABLE_FOG_TINT"
		| "_RIMLIGHT_NONE"
	>;
	Standard?: Array<"DIFFUSE" | "ENABLE_DIFFUSE" | "ENABLE_FOG" | "ENABLE_HEIGHT_FOG" | "ENABLE_SPECULAR" | "FOG" | "HEIGHT_FOG" | "REFLECTION_PROBE_BOX_PROJECTION" | "SPECULAR" | "_EMISSION" | "_ENABLE_FOG_TINT" | "_RIMLIGHT_NONE">;
	WaterfallMirror?: Array<"DETAIL_NORMAL_MAP" | "ENABLE_MIRROR" | "ETC1_EXTERNAL_ALPHA" | "LIGHTMAP" | "REFLECTION_PROBE_BOX_PROJECTION" | "_EMISSION">;
};
