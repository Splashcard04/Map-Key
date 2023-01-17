import { ColorType } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

//Property presets for BlenderFrameMath
export type BFM_PROPS = 
    "_beatTime" |
    "_seconds" |
    "_totalFrames" |
    "_framesPerBeat"
    
    export type GEO_FILTER_PROPS = 
    "track" |
    "position" |
    "rotation" |
    "scale" |
    "type" |
    "material" |
    "position[0]" |
    "position[1]" |
    "position[2]" |
    "rotation[0]" |
    "rotation[1]" |
    "rotation[2]" |
    "scale[0]" |
    "scale[1]" |
    "scale[2]"

export type ENV_FILTER_PROPS = 
    "track" |
    "position" |
    "rotation" |
    "scale" |
    "id" |
    "lookupMethod" |
    "position[0]" |
    "position[1]" |
    "position[2]" |
    "rotation[0]" |
    "rotation[1]" |
    "rotation[2]" |
    "scale[0]" |
    "scale[1]" |
    "scale[2]"

export type NOTE_FILTER_PROPS = 
    "time" |
    "type" |
    "track" |
    "x" |
    "y" |
    "direction" |
    "fake" |
    "interactable" |
    "color" |
    "color[0]" |
    "color[1]" |
    "color[2]" |
    "color[3]" |
    "rotation" |
    "rotation[0]" |
    "rotation[1]" |
    "rotation[2]" |
    "localRotation" |
    "localRotation[0]" |
    "localRotation[1]" |
    "localRotation[2]" |
    "offset" |
    "NJS"

// to use with params in the filter functions
export enum position {
  x = "position[0]",
  y = "position[1]",
  z = "position[2]"
}

export enum rotation {
  pitch = "rotation[0]",
  yaw = "rotation[1]",
  roll = "rotation[2]",
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
        rain: "Rain$"
    },

    all: {
        cinemaScreen: "CinemaScreen$",
        cinemaDirLight: "CinemaDirectionalLight$",
        mirror: "Place\\.\\[\\d+\\]Mirror$"
    }
}

export enum lightTypes {
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
