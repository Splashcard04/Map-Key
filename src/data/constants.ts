import { EASE, Vec3 } from "https://deno.land/x/remapper@3.1.2/src/mod.ts";

type ColorType = [number, number, number, number] | [number, number, number];

//Property presets for BlenderFrameMath

export const Env = {
	gaga: {
		Aurora: "AuroraSecondary$",
		Lightning: "1L\\.\\[\\d+\\]\\w+\\.\\[\\d+\\]LightningWithTarget$",
		solidLaser: "FrontLaserL$",
		directionalLight: "DirectionalLightFront$",
		gagaLogo: "[^Logo]{4}\\.\\[\\d+\\]Logo$"
	},
	billie: {
		directionalLight: "Day\\.\\[\\d+\\]\\w+Front$",
		solidLaser: "\\w+\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+LH$",
		sun: "Sun$",
		clouds: "Clouds$",
		smoke: "BigSmokePS$",
		railLight: "t\\.\\[\\d+\\]Neon\\w+L$",
		rain: "Rain$"
	},
	BTS: {
		doorLight: "MagicDoorSprite",
		upperClouds: "HighCloudsGenerator$",
		lowerClouds: "LowCloudsGenerator$",
		allClouds: "Clouds$"
	},
	all: {
		cinemaScreen: "CinemaScreen$",
		cinemaDirLight: "CinemaDirectionalLight$",
		mirror: "Place\\.\\[\\d+\\]Mirror$",
		playerPlatform: "PlayersPlace$"
	}
};

export const colors = {
	pink: [1, 0.2, 1] as ColorType,
	orange: [1, 0.5765, 0.2] as ColorType,
	yellow: [1, 0.8824, 0.2] as ColorType,
	brown: [0.4706, 0.2431, 0.0314] as ColorType,
	cyan: [0.149, 0.7686, 0.8471] as ColorType,
	maroon: [0.502, 0, 0] as ColorType,
	darkRed: [0.5451, 0, 0] as ColorType,
	firebrick: [0.698, 0.1333, 0.1333] as ColorType,
	crimson: [0.8627, 0.0784, 0.2353] as ColorType,
	tomato: [1, 0.3882, 0.2784] as ColorType,
	coral: [1, 0.498, 0.3137] as ColorType,
	indianRed: [0.8039, 0.3608, 0.3608] as ColorType,
	lightCoral: [0.9412, 0.502, 0.502] as ColorType,
	darkSalmon: [0.9137, 0.5882, 0.4784] as ColorType,
	salmon: [0.9804, 0.502, 0.4471] as ColorType,
	lightSalmon: [1, 0.6275, 0.4784] as ColorType,
	orangeRed: [1, 0.2706, 0] as ColorType,
	darkOrange: [1, 0.549, 0] as ColorType,
	gold: [1, 0.8431, 0] as ColorType,
	darkGoldenRod: [0.7216, 0.5255, 0.0431] as ColorType,
	goldenRod: [0.8549, 0.6471, 0.1255] as ColorType,
	paleGoldenRod: [0.9333, 0.9098, 0.6667] as ColorType,
	darkKhaki: [0.7412, 0.7176, 0.4196] as ColorType,
	khaki: [0.9412, 0.902, 0.549] as ColorType,
	olive: [0.502, 0.502, 0] as ColorType,
	yellowGreen: [0.6039, 0.8039, 0.1961] as ColorType,
	darkOliveGreen: [0.3333, 0.4196, 0.1843] as ColorType,
	oliveDrab: [0.4196, 0.5569, 0.1255] as ColorType,
	lawnGreen: [0.4863, 0.9882, 0] as ColorType,
	chartreuse: [0.498, 1, 0] as ColorType,
	greenYellow: [0.6784, 1, 0.1843] as ColorType,
	darkGreen: [0, 0.3922, 0] as ColorType,
	forestGreen: [0.1333, 0.5451, 0.1333] as ColorType,
	green: [0, 1, 0] as ColorType,
	limeGreen: [0.1961, 0.8039, 0.1961] as ColorType,
	lightGreen: [0.5647, 0.9333, 0.5647] as ColorType,
	paleGreen: [0.5961, 0.9843, 0.5961] as ColorType,
	darkSeaGreen: [0.5608, 0.7373, 0.5608] as ColorType,
	mediumSpringGreen: [0, 0.9804, 0.6039] as ColorType,
	springGreen: [0, 1, 0.498] as ColorType,
	seaGreen: [0.1804, 0.5451, 0.3412] as ColorType,
	mediumAquaMarine: [0.4, 0.8039, 0.6667] as ColorType,
	mediumSeaGreen: [0.2353, 0.702, 0.4431] as ColorType,
	lightSeaGreen: [0.1255, 0.698, 0.6667] as ColorType,
	darkSlateGrey: [0.1843, 0.3098, 0.3098] as ColorType,
	teal: [0, 0.502, 0.502] as ColorType,
	darkCyan: [0, 0.5451, 0.5451] as ColorType,
	aqua: [0, 1, 1] as ColorType,
	lightCyan: [0.8784, 1, 1] as ColorType,
	darkTurquoise: [0, 0.8078, 0.8196] as ColorType,
	turquoise: [0.251, 0.8784, 0.8157] as ColorType,
	mediumTurquoise: [0.2824, 0.8196, 0.8] as ColorType,
	paleTurquoise: [0.6863, 0.9333, 0.9333] as ColorType,
	aquaMarine: [0.498, 1, 0.8314] as ColorType,
	powderBlue: [0.6902, 0.8784, 0.902] as ColorType,
	cadetBlue: [0.3725, 0.6196, 0.6275] as ColorType,
	steelBlue: [0.2745, 0.5098, 0.7059] as ColorType,
	cornFlowerBlue: [0.3922, 0.5843, 0.9294] as ColorType,
	deepSkyBlue: [0, 0.749, 1] as ColorType,
	dodgerBlue: [0.1176, 0.5647, 1] as ColorType,
	lightBlue: [0.6784, 0.8471, 0.902] as ColorType,
	skyBlue: [0.5294, 0.8078, 0.9216] as ColorType,
	lightSkyBlue: [0.5294, 0.8078, 0.9804] as ColorType,
	midnightBlue: [0.098, 0.098, 0.4392] as ColorType,
	navy: [0, 0, 0.502] as ColorType,
	darkBlue: [0, 0, 0.5451] as ColorType,
	mediumBlue: [0, 0, 0.8039] as ColorType,
	blue: [0, 0, 1] as ColorType,
	royalBlue: [0.2549, 0.4118, 0.8824] as ColorType,
	blueViolet: [0.5412, 0.1686, 0.8863] as ColorType,
	indigo: [0.2941, 0, 0.5098] as ColorType,
	darkSlateBlue: [0.2824, 0.2392, 0.5451] as ColorType,
	slateBlue: [0.4157, 0.3529, 0.8039] as ColorType,
	mediumSlateBlue: [0.4824, 0.4078, 0.9333] as ColorType,
	mediumPurple: [0.5765, 0.4392, 0.8588] as ColorType,
	darkMagenta: [0.5451, 0, 0.5451] as ColorType,
	darkViolet: [0.5804, 0, 0.8275] as ColorType,
	darkOrchid: [0.6, 0.1961, 0.8] as ColorType,
	mediumOrchid: [0.7294, 0.3333, 0.8275] as ColorType,
	purple: [0.502, 0, 0.502] as ColorType,
	thistle: [0.8471, 0.749, 0.8471] as ColorType,
	plum: [0.8667, 0.6275, 0.8667] as ColorType,
	violet: [0.9333, 0.5098, 0.9333] as ColorType,
	fuchsia: [1, 0, 1] as ColorType,
	orchid: [0.8549, 0.4392, 0.8392] as ColorType,
	mediumVioletRed: [0.7804, 0.0824, 0.5216] as ColorType,
	paleVioletRed: [0.8588, 0.4392, 0.8392] as ColorType,
	deepPink: [1, 0.0784, 0.5765] as ColorType,
	hotPink: [1, 0.4118, 0.7059] as ColorType,
	lightPink: [1, 0.7137, 0.7569] as ColorType,
	antiqueWhite: [0.9804, 0.9216, 0.8431] as ColorType,
	beige: [0.9608, 0.9608, 0.8627] as ColorType,
	bisque: [1, 0.8941, 0.7686] as ColorType,
	blanchedAlmond: [1, 0.9216, 0.8039] as ColorType,
	wheat: [0.9608, 0.8706, 0.702] as ColorType,
	cornSilk: [1, 0.9725, 0.8627] as ColorType,
	lemonChiffon: [1, 0.9804, 0.8039] as ColorType,
	lightGoldenRodYellow: [0.9804, 0.9804, 0.8235] as ColorType,
	lightYellow: [1, 1, 0.8784] as ColorType,
	saddleBrown: [0.5451, 0.2706, 0.0745] as ColorType,
	sienna: [0.6275, 0.3216, 0.1765] as ColorType,
	chocolate: [0.8235, 0.4118, 0.1176] as ColorType,
	peru: [0.8039, 0.5216, 0.2471] as ColorType,
	sandyBrown: [0.9569, 0.6431, 0.3765] as ColorType,
	burlyWood: [0.8706, 0.7216, 0.5294] as ColorType,
	tan: [0.8235, 0.7059, 0.549] as ColorType,
	rosyBrown: [0.7373, 0.5608, 0.5608] as ColorType,
	moccasin: [1, 0.8941, 0.7098] as ColorType,
	navajoWhite: [1, 0.8706, 0.6784] as ColorType,
	peachPuff: [1, 0.8549, 0.7255] as ColorType,
	mistyRose: [1, 0.8941, 0.8824] as ColorType,
	lavenderBlush: [1, 0.9412, 0.9608] as ColorType,
	linen: [0.9804, 0.9412, 0.902] as ColorType,
	oldLace: [0.9922, 0.9608, 0.902] as ColorType,
	papayaWhip: [1, 0.9373, 0.8353] as ColorType,
	seaShell: [1, 0.9608, 0.9333] as ColorType,
	mintCream: [0.9608, 1, 0.9804] as ColorType,
	slateGray: [0.4392, 0.502, 0.5647] as ColorType,
	lightSlateGray: [0.4667, 0.5333, 0.6] as ColorType,
	lightSteelBlue: [0.6902, 0.7686, 0.8706] as ColorType,
	lavender: [0.902, 0.902, 0.9804] as ColorType,
	floralWhite: [1, 0.9804, 0.9412] as ColorType,
	aliceBlue: [0.9412, 0.9725, 1] as ColorType,
	ghostWhite: [0.9725, 0.9725, 1] as ColorType,
	honeydew: [0.9412, 1, 0.9412] as ColorType,
	ivory: [1, 1, 0.9412] as ColorType,
	azure: [0.9412, 1, 1] as ColorType,
	snow: [1, 0.9804, 0.9804] as ColorType,
	black: [0, 0, 0] as ColorType,
	dimGray: [0.4118, 0.4118, 0.4118] as ColorType,
	gray: [0.502, 0.502, 0.502] as ColorType,
	darkGray: [0.6627, 0.6627, 0.6627] as ColorType,
	silver: [0.7529, 0.7529, 0.7529] as ColorType,
	lightGray: [0.8275, 0.8275, 0.8275] as ColorType,
	gainsboro: [0.8627, 0.8627, 0.8627] as ColorType,
	whiteSmoke: [0.9608, 0.9608, 0.9608] as ColorType,
	white: [1, 1, 1] as ColorType
};

/**
 * Shortcut for -69420, saves space when moving objects out of player sight.
 */
export const ye = -69420;

/**
 * Shortcut for [-69420, -69420, -69420], saves space when moving objects out of player sight.
 */
export const ye3 = [ye, ye, ye] as Vec3;

/**
 * Shortcut for keyframe of [-69420, -69420, -69420, time, ease?], saves space when moving objects out of player sight.
 * @param time The time of the keyframe.
 * @param ease Optional easing.
 * @param spline Optional spline.
 * @returns Keyframe
 */
export const yeframe = (time: number, ease?: EASE, spline?: "splineCatmullRom") => {
	const out: [number, number, number, number, string?, string?] = [ye, ye, ye, time];
	if (ease) out.push(ease);
	if (spline) out.push(spline);
	return out;
};
