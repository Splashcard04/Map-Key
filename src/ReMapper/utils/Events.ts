import { ColorType, EASE, Event } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";

export class gradient {
    constructor(public time = 0, public duration = 1, public type = 0, public colors: ColorType[], public lerpType?: "HSV" | "RGB", public easing?: EASE){}
    push() {
        const startE = new Event(this.time).backLasers().on(this.colors[0])
        startE.type = this.type;
        startE.push()
        let i = 0;
        this.colors.forEach(color =>{
            if(i !== 0){
                const inE = new Event(i*this.duration/(this.colors.length-1)).backLasers().in(color)
                inE.type = this.type;
                if(this.easing){
                    inE.easing = this.easing
                }
                if(this.lerpType){
                    inE.lerpType = this.lerpType
                }
                inE.push()
            }
            i++
        })
    }
}

export class strobe {
    constructor(public time: number, public duration: number) {}

    get interval() { return this.interval }
    set interval(interval: number) { this.interval = interval }

    get type() { return this.type }
    set type(type: number) { this.type = type }

    get color() { return this.color }
    set color(color: ColorType) { this.color = color }

    push() {
        const off = this.time + 1 / this.interval
        for(let i = 0; i < this.interval / this.duration; i++) {
            const ev = new Event(this.time + 1/this.interval).backLasers().on(this.color)
            ev.type = this.type
            ev.push()
        }

        for(let i = 0; i < this.interval / this.duration; i++) {
            const ev = new Event(off + 1/this.interval).backLasers().off();
            ev.type = this.type;
            ev.push()
        }
    }
}