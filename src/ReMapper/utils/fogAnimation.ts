import { baseEnvironmentTrack, CustomEventInternals } from 'https//deno.land/x/remapper@3.1.1/src/mod.ts'

export class animateFog {
    constructor(public time: number, public duration: number, public forFog: (x: CustomEventInternals.animateComponent) => void) {
        this.time = time; this.duration = duration; this.forFog = forFog
    }

    push() {
        baseEnvironmentTrack("FogTrack")
        const fog = new CustomEvent(this.time).animateComponent("FogTrack")
        this.forFog(fog)
        fog.push()
    }
}