import { ColorType } from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

//Property presets for BlenderFrameMath
export type BFM_PROPS = 
    "_beatTime" |
    "_seconds" |
    "_totalFrames" |
    "_framesPerBeat"
    
export const Env = {
    gaga: {
        Aurora: "Aurora\\.\\[1\\]AuroraSecondary$",
        Lightning: "[3\\]LightingWithTarget$",
        solidLaser: "[0\\]FrontLaserL$",
        directionalLight: "DirectionalLights\\.\\[0\\]DirectionalLightFront$"
    },
    billie: {
        directionalLight: "DayAndNight\\.\\[0\\]Day\\.\\[1\\]DirectionalLightFront$",
        solidLaser: "[46\\]BottomPairLasers\\.\\[0\\]PillarL\\.\\[0\\]RotationBaseL\\.\\[0\\]LaserLH"
    },

    all: {
        cinemaScreen: "CinemaScreen$",
        cinemaDirLight: "CinemaDirectionalLight$",
        mirror: "PlayersPlace\\.\\[d*\\]Mirror"
    }
}

export const colors = {
    rgb: {
        pink : [] as ColorType,
        orange: [] as ColorType,
        yellow: [] as ColorType,
        brown: [] as ColorType
    }
}