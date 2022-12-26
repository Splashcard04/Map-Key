import { ColorType } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

//Property presets for BlenderFrameMath
export type BFM_PROPS = 
    "_beatTime" |
    "_seconds" |
    "_totalFrames" |
    "_framesPerBeat"
    
    export type GEO_FILTER_PROPS = 
    "track" |
    "position" |
    "position[0]" |
    "position[1]" |
    "position[2]" |
    "rotation" |
    "rotation[0]" |
    "rotation[1]" |
    "rotation[2]" |
    "scale" |
    "scale[0]" |
    "scale[1]" |
    "scale[2]" |
    "type" |
    "material"

export type ENV_FILTER_PROPS = 
    "track" |
    "position" |
    "position[0]" |
    "position[1]" |
    "position[2]" |
    "rotation" |
    "rotation[0]" |
    "rotation[1]" |
    "rotation[2]" |
    "scale" |
    "scale[0]" |
    "scale[1]" |
    "scale[2]" |
    "id" |
    "lookupMethod"

export const Env = {
    gaga: {
        Aurora: "AuroraSecondary$",
        Lightning: "1L\\.\\[\\d+\\]\\w+\\.\\[\\d+\\]LightningWithTarget$",
        solidLaser: "FrontLaserL$",
        directionalLight: "DirectionalLightFront$"
    },
    billie: {
        directionalLight: "Day\\.\\[\\d+\\]\\w+Front$",
        solidLaser: "\\w+\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+LH"
    },

    all: {
        cinemaScreen: "CinemaScreen$",
        cinemaDirLight: "CinemaDirectionalLight$",
        mirror: "Place\\.\\[\\d+\\]Mirror$"
    }
}

export const colors = {
    rgb: {
        pink : [255, 51, 255, 1] as ColorType,
        orange: [255, 147, 51, 1] as ColorType,
        yellow: [255, 225, 51 , 1] as ColorType,
        brown: [120, 62, 8 , 1] as ColorType,
        cyan: [38, 196, 216, 1] as ColorType 
    },
    pink: [1, 0.3, 1, 1] as ColorType,
    orange: [1, 0.45, 0.1, 1] as ColorType,
    yellow: [1, 1, 0.1, 1] as ColorType,
    brown: [0.5, 0.12, 0.01, 1] as ColorType,
    cyan: [0.1, 0.9, 0.9, 1]
}
