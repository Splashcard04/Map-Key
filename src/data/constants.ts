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

// deno-lint-ignore no-explicit-any
export const colors: Record<any, ColorType> = {
	pink: [1, 0.2, 1],
	orange: [1, 0.5765, 0.2],
	yellow: [1, 0.8824, 0.2],
	brown: [0.4706, 0.2431, 0.0314],
	cyan: [0.149, 0.7686, 0.8471],
	maroon: [0.502, 0, 0],
	darkRed: [0.5451, 0, 0],
	firebrick: [0.698, 0.1333, 0.1333],
	crimson: [0.8627, 0.0784, 0.2353],
	tomato: [1, 0.3882, 0.2784],
	coral: [1, 0.498, 0.3137],
	indianRed: [0.8039, 0.3608, 0.3608],
	lightCoral: [0.9412, 0.502, 0.502],
	darkSalmon: [0.9137, 0.5882, 0.4784],
	salmon: [0.9804, 0.502, 0.4471],
	lightSalmon: [1, 0.6275, 0.4784],
	orangeRed: [1, 0.2706, 0],
	darkOrange: [1, 0.549, 0],
	gold: [1, 0.8431, 0],
	darkGoldenRod: [0.7216, 0.5255, 0.0431],
	goldenRod: [0.8549, 0.6471, 0.1255],
	paleGoldenRod: [0.9333, 0.9098, 0.6667],
	darkKhaki: [0.7412, 0.7176, 0.4196],
	khaki: [0.9412, 0.902, 0.549],
	olive: [0.502, 0.502, 0],
	yellowGreen: [0.6039, 0.8039, 0.1961],
	darkOliveGreen: [0.3333, 0.4196, 0.1843],
	oliveDrab: [0.4196, 0.5569, 0.1255],
	lawnGreen: [0.4863, 0.9882, 0],
	chartreuse: [0.498, 1, 0],
	greenYellow: [0.6784, 1, 0.1843],
	darkGreen: [0, 0.3922, 0],
	forestGreen: [0.1333, 0.5451, 0.1333],
	green: [0, 1, 0],
	limeGreen: [0.1961, 0.8039, 0.1961],
	lightGreen: [0.5647, 0.9333, 0.5647],
	paleGreen: [0.5961, 0.9843, 0.5961],
	darkSeaGreen: [0.5608, 0.7373, 0.5608],
	mediumSpringGreen: [0, 0.9804, 0.6039],
	springGreen: [0, 1, 0.498],
	seaGreen: [0.1804, 0.5451, 0.3412],
	mediumAquaMarine: [0.4, 0.8039, 0.6667],
	mediumSeaGreen: [0.2353, 0.702, 0.4431],
	lightSeaGreen: [0.1255, 0.698, 0.6667],
	darkSlateGrey: [0.1843, 0.3098, 0.3098],
	teal: [0, 0.502, 0.502],
	darkCyan: [0, 0.5451, 0.5451],
	aqua: [0, 1, 1],
	lightCyan: [0.8784, 1, 1],
	darkTurquoise: [0, 0.8078, 0.8196],
	turquoise: [0.251, 0.8784, 0.8157],
	mediumTurquoise: [0.2824, 0.8196, 0.8],
	paleTurquoise: [0.6863, 0.9333, 0.9333],
	aquaMarine: [0.498, 1, 0.8314],
	powderBlue: [0.6902, 0.8784, 0.902],
	cadetBlue: [0.3725, 0.6196, 0.6275],
	steelBlue: [0.2745, 0.5098, 0.7059],
	cornFlowerBlue: [0.3922, 0.5843, 0.9294],
	deepSkyBlue: [0, 0.749, 1],
	dodgerBlue: [0.1176, 0.5647, 1],
	lightBlue: [0.6784, 0.8471, 0.902],
	skyBlue: [0.5294, 0.8078, 0.9216],
	lightSkyBlue: [0.5294, 0.8078, 0.9804],
	midnightBlue: [0.098, 0.098, 0.4392],
	navy: [0, 0, 0.502],
	darkBlue: [0, 0, 0.5451],
	mediumBlue: [0, 0, 0.8039],
	blue: [0, 0, 1],
	royalBlue: [0.2549, 0.4118, 0.8824],
	blueViolet: [0.5412, 0.1686, 0.8863],
	indigo: [0.2941, 0, 0.5098],
	darkSlateBlue: [0.2824, 0.2392, 0.5451],
	slateBlue: [0.4157, 0.3529, 0.8039],
	mediumSlateBlue: [0.4824, 0.4078, 0.9333],
	mediumPurple: [0.5765, 0.4392, 0.8588],
	darkMagenta: [0.5451, 0, 0.5451],
	darkViolet: [0.5804, 0, 0.8275],
	darkOrchid: [0.6, 0.1961, 0.8],
	mediumOrchid: [0.7294, 0.3333, 0.8275],
	purple: [0.502, 0, 0.502],
	thistle: [0.8471, 0.749, 0.8471],
	plum: [0.8667, 0.6275, 0.8667],
	violet: [0.9333, 0.5098, 0.9333],
	fuchsia: [1, 0, 1],
	orchid: [0.8549, 0.4392, 0.8392],
	mediumVioletRed: [0.7804, 0.0824, 0.5216],
	paleVioletRed: [0.8588, 0.4392, 0.8392],
	deepPink: [1, 0.0784, 0.5765],
	hotPink: [1, 0.4118, 0.7059],
	lightPink: [1, 0.7137, 0.7569],
	antiqueWhite: [0.9804, 0.9216, 0.8431],
	beige: [0.9608, 0.9608, 0.8627],
	bisque: [1, 0.8941, 0.7686],
	blanchedAlmond: [1, 0.9216, 0.8039],
	wheat: [0.9608, 0.8706, 0.702],
	cornSilk: [1, 0.9725, 0.8627],
	lemonChiffon: [1, 0.9804, 0.8039],
	lightGoldenRodYellow: [0.9804, 0.9804, 0.8235],
	lightYellow: [1, 1, 0.8784],
	saddleBrown: [0.5451, 0.2706, 0.0745],
	sienna: [0.6275, 0.3216, 0.1765],
	chocolate: [0.8235, 0.4118, 0.1176],
	peru: [0.8039, 0.5216, 0.2471],
	sandyBrown: [0.9569, 0.6431, 0.3765],
	burlyWood: [0.8706, 0.7216, 0.5294],
	tan: [0.8235, 0.7059, 0.549],
	rosyBrown: [0.7373, 0.5608, 0.5608],
	moccasin: [1, 0.8941, 0.7098],
	navajoWhite: [1, 0.8706, 0.6784],
	peachPuff: [1, 0.8549, 0.7255],
	mistyRose: [1, 0.8941, 0.8824],
	lavenderBlush: [1, 0.9412, 0.9608],
	linen: [0.9804, 0.9412, 0.902],
	oldLace: [0.9922, 0.9608, 0.902],
	papayaWhip: [1, 0.9373, 0.8353],
	seaShell: [1, 0.9608, 0.9333],
	mintCream: [0.9608, 1, 0.9804],
	slateGray: [0.4392, 0.502, 0.5647],
	lightSlateGray: [0.4667, 0.5333, 0.6],
	lightSteelBlue: [0.6902, 0.7686, 0.8706],
	lavender: [0.902, 0.902, 0.9804],
	floralWhite: [1, 0.9804, 0.9412],
	aliceBlue: [0.9412, 0.9725, 1],
	ghostWhite: [0.9725, 0.9725, 1],
	honeydew: [0.9412, 1, 0.9412],
	ivory: [1, 1, 0.9412],
	azure: [0.9412, 1, 1],
	snow: [1, 0.9804, 0.9804],
	black: [0, 0, 0],
	dimGray: [0.4118, 0.4118, 0.4118],
	gray: [0.502, 0.502, 0.502],
	darkGray: [0.6627, 0.6627, 0.6627],
	silver: [0.7529, 0.7529, 0.7529],
	lightGray: [0.8275, 0.8275, 0.8275],
	gainsboro: [0.8627, 0.8627, 0.8627],
	whiteSmoke: [0.9608, 0.9608, 0.9608],
	white: [1, 1, 1]
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
