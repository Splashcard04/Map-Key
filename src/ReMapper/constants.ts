import { ColorType } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

//Property presets for BlenderFrameMath
export type BFM_PROPS = "_beatTime" | "_seconds" | "_totalFrames" | "_framesPerBeat";

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
	z = "position[2]",
}

export enum rotation {
	pitch = "rotation[0]",
	yaw = "rotation[1]",
	roll = "rotation[2]",
}

export enum localRotation {
	pitch = "localRotation[0]",
	yaw = "localRotation[1]",
	roll = "localRotation[2]",
}

export enum scale {
	x = "scale[0]",
	y = "scale[1]",
	z = "scale[2]",
}

export const Env = {
	gaga: {
		Aurora: "AuroraSecondary$",
		Lightning: "1L\\.\\[\\d+\\]\\w+\\.\\[\\d+\\]LightningWithTarget$",
		solidLaser: "FrontLaserL$",
		directionalLight: "DirectionalLightFront$",
		gagaLogo: "[^Logo]{4}\\.\\[\\d+\\]Logo$",
	},
	billie: {
		directionalLight: "Day\\.\\[\\d+\\]\\w+Front$",
		solidLaser: "\\w+\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+LH$",
		sun: "Sun$",
		clouds: "Clouds$",
		smoke: "BigSmokePS$",
		railLight: "t\\.\\[\\d+\\]Neon\\w+L$",
		rain: "Rain$",
	},
	BTS: {
		doorLight: "MagicDoorSprite",
		upperClouds: "HighCloudsGenerator$",
		lowerClouds: "LowCloudsGenerator$",
		allClouds: "Clouds$",
	},
	all: {
		cinemaScreen: "CinemaScreen$",
		cinemaDirLight: "CinemaDirectionalLight$",
		mirror: "Place\\.\\[\\d+\\]Mirror$",
		playerPlatform: "PlayersPlace$",
	},
};

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
	gagaRight = 19,
}

export const colors = {
	rgb: {
		pink: [255, 51, 255, 1] as ColorType,
		orange: [255, 147, 51, 1] as ColorType,
		yellow: [255, 225, 51, 1] as ColorType,
		brown: [120, 62, 8, 1] as ColorType,
		cyan: [38, 196, 216, 1] as ColorType,
		maroon: [128, 0, 0, 1] as ColorType,
		darkRed: [139, 0, 0, 1] as ColorType,
		firebrick: [178, 34, 34, 1] as ColorType,
		crimson: [220, 20, 60, 1] as ColorType,
		tomato: [255, 99, 71, 1] as ColorType,
		coral: [255, 127, 80, 1] as ColorType,
		indianRed: [205, 92, 92, 1] as ColorType,
		lightCoral: [240, 128, 128, 1] as ColorType,
		darkSalmon: [233, 150, 122, 1] as ColorType,
		salmon: [250, 128, 114, 1] as ColorType,
		lightSalmon: [255, 160, 122, 1] as ColorType,
		orangeRed: [255, 69, 0, 1] as ColorType,
		darkOrange: [255, 140, 0, 1] as ColorType,
		gold: [255, 215, 0, 1] as ColorType,
		darkGoldenRod: [184, 134, 11, 1] as ColorType,
		goldenRod: [218, 165, 32, 1] as ColorType,
		paleGoldenRod: [238, 232, 170, 1] as ColorType,
		darkKhaki: [189, 183, 107, 1] as ColorType,
		khaki: [240, 230, 140, 1] as ColorType,
		olive: [128, 128, 0, 1] as ColorType,
		yellowGreen: [154, 205, 50, 1] as ColorType,
		darkOliveGreen: [85, 107, 47, 1] as ColorType,
		oliveDrab: [107, 142, 32, 1] as ColorType,
		lawnGreen: [124, 252, 0, 1] as ColorType,
		chartreuse: [127, 255, 0, 1] as ColorType,
		greenYellow: [173, 255, 47, 1] as ColorType,
		darkGreen: [0, 100, 0, 1] as ColorType,
		forestGreen: [34, 139, 34, 1] as ColorType,
		green: [0, 255, 0, 1] as ColorType,
		limeGreen: [50, 205, 50, 1] as ColorType,
		lightGreen: [144, 238, 144, 1] as ColorType,
		paleGreen: [152, 251, 152, 1] as ColorType,
		darkSeaGreen: [143, 188, 143, 1] as ColorType,
		mediumSpringGreen: [0, 250, 154, 1] as ColorType,
		springGreen: [0, 255, 127, 1] as ColorType,
		seaGreen: [46, 139, 87, 1] as ColorType,
		mediumAquaMarine: [102, 205, 170, 1] as ColorType,
		mediumSeaGreen: [60, 179, 113, 1] as ColorType,
		lightSeaGreen: [32, 178, 170, 1] as ColorType,
		darkSlateGrey: [47, 79, 79, 1] as ColorType,
		teal: [0, 128, 128, 1] as ColorType,
		darkCyan: [0, 139, 139, 1] as ColorType,
		aqua: [0, 255, 255, 1] as ColorType,
		lightCyan: [224, 255, 255, 1] as ColorType,
		darkTurquoise: [0, 206, 209, 1] as ColorType,
		turquoise: [64, 224, 208, 1] as ColorType,
		mediumTurquoise: [72, 209, 204, 1] as ColorType,
		paleTurquoise: [175, 238, 238, 1] as ColorType,
		aquaMarine: [127, 255, 212, 1] as ColorType,
		powderBlue: [176, 224, 230, 1] as ColorType,
		cadetBlue: [95, 158, 160, 1] as ColorType,
		steelBlue: [70, 130, 180, 1] as ColorType,
		cornFlowerBlue: [100, 149, 237, 1] as ColorType,
		deepSkyBlue: [0, 191, 255, 1] as ColorType,
		dodgerBlue: [30, 144, 255, 1] as ColorType,
		lightBlue: [173, 216, 230, 1] as ColorType,
		skyBlue: [135, 206, 235, 1] as ColorType,
		lightSkyBlue: [135, 206, 250, 1] as ColorType,
		midnightBlue: [25, 25, 112, 1] as ColorType,
		navy: [0, 0, 128, 1] as ColorType,
		darkBlue: [0, 0, 139, 1] as ColorType,
		mediumBlue: [0, 0, 205, 1] as ColorType,
		blue: [0, 0, 255, 1] as ColorType,
		royalBlue: [65, 105, 225, 1] as ColorType,
		blueViolet: [138, 43, 226, 1] as ColorType,
		indigo: [75, 0, 130, 1] as ColorType,
		darkSlateBlue: [72, 61, 139, 1] as ColorType,
		slateBlue: [106, 90, 205, 1] as ColorType,
		mediumSlateBlue: [123, 104, 238, 1] as ColorType,
		mediumPurple: [147, 112, 219, 1] as ColorType,
		darkMagenta: [139, 0, 139, 1] as ColorType,
		darkViolet: [148, 0, 211, 1] as ColorType,
		darkOrchid: [153, 50, 204, 1] as ColorType,
		mediumOrchid: [186, 85, 211, 1] as ColorType,
		purple: [128, 0, 128, 1] as ColorType,
		thistle: [216, 191, 216, 1] as ColorType,
		plum: [221, 160, 221, 1] as ColorType,
		violet: [238, 130, 238, 1] as ColorType,
		fuchsia: [255, 0, 255, 1] as ColorType,
		orchid: [218, 112, 214, 1] as ColorType,
		mediumVioletRed: [199, 21, 133, 1] as ColorType,
		paleVioletRed: [219, 112, 214, 1] as ColorType,
		deepPink: [255, 20, 147, 1] as ColorType,
		hotPink: [255, 105, 180, 1] as ColorType,
		lightPink: [255, 182, 193, 1] as ColorType,
		antiqueWhite: [250, 235, 215, 1] as ColorType,
		beige: [245, 245, 220, 1] as ColorType,
		bisque: [255, 228, 196, 1] as ColorType,
		blanchedAlmond: [255, 235, 205, 1] as ColorType,
		wheat: [245, 222, 179, 1] as ColorType,
		cornSilk: [255, 248, 220, 1] as ColorType,
		lemonChiffon: [255, 250, 205, 1] as ColorType,
		lightGoldenRodYellow: [250, 250, 210, 1] as ColorType,
		lightYellow: [255, 255, 224, 1] as ColorType,
		saddleBrown: [139, 69, 19, 1] as ColorType,
		sienna: [160, 82, 45, 1] as ColorType,
		chocolate: [210, 105, 30, 1] as ColorType,
		peru: [205, 133, 63, 1] as ColorType,
		sandyBrown: [244, 164, 96, 1] as ColorType,
		burlyWood: [222, 184, 135, 1] as ColorType,
		tan: [210, 180, 140, 1] as ColorType,
		rosyBrown: [188, 143, 143, 1] as ColorType,
		moccasin: [255, 228, 181, 1] as ColorType,
		navajoWhite: [255, 222, 173, 1] as ColorType,
		peachPuff: [255, 218, 185, 1] as ColorType,
		mistyRose: [255, 228, 225, 1] as ColorType,
		lavenderBlush: [255, 240, 245, 1] as ColorType,
		linen: [250, 240, 230, 1] as ColorType,
		oldLace: [253, 245, 230, 1] as ColorType,
		papayaWhip: [255, 239, 213, 1] as ColorType,
		seaShell: [255, 245, 238, 1] as ColorType,
		mintCream: [245, 255, 250, 1] as ColorType,
		slateGray: [112, 128, 144, 1] as ColorType,
		lightSlateGray: [119, 136, 153, 1] as ColorType,
		lightSteelBlue: [176, 196, 222, 1] as ColorType,
		lavender: [230, 230, 250, 1] as ColorType,
		floralWhite: [255, 250, 240, 1] as ColorType,
		aliceBlue: [240, 248, 255, 1] as ColorType,
		ghostWhite: [248, 248, 255, 1] as ColorType,
		honeydew: [240, 255, 240, 1] as ColorType,
		ivory: [255, 255, 240, 1] as ColorType,
		azure: [240, 255, 255, 1] as ColorType,
		snow: [255, 250, 250, 1] as ColorType,
		black: [0, 0, 0, 1] as ColorType,
		dimGray: [105, 105, 105, 1] as ColorType,
		gray: [128, 128, 128] as ColorType,
		darkGray: [169, 169, 169, 1] as ColorType,
		silver: [192, 192, 192, 1] as ColorType,
		lightGray: [211, 211, 211, 1] as ColorType,
		gainsboro: [220, 220, 220, 1] as ColorType,
		whiteSmoke: [245, 245, 245, 1] as ColorType,
		white: [255, 255, 255, 1] as ColorType,
	},
	pink: [1, 0.3, 1, 1] as ColorType,
	orange: [1, 0.45, 0.1, 1] as ColorType,
	yellow: [1, 1, 0.1, 1] as ColorType,
	brown: [0.5, 0.12, 0.01, 1] as ColorType,
	cyan: [0.1, 0.9, 0.9, 1],
};

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
