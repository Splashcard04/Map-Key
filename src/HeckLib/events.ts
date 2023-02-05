import * as e from "https://deno.land/x/remapper@3.1.1/src/easings.ts";
import { Color, ColorType, setDecimals, EASE } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { repeat } from "../ReMapper/utils/general.ts";
import { LightEvent } from "./HeckLib/lights.ts";
import { lights } from "./HeckLib/mapHandler.ts";
import { lightType } from "./HeckLib/types.ts";
export class lightGradient {
    /**
     * Create simple lighting gradients.
     * @param time The time to start the gradient.
     * @param duration The duration of the gradient.
     * @param type The light type to use.
     * @param colors The colors to include in the gradient.
     * @param lerpType The color lerp to use.
     * @param easing The easing to use on each color.
     */
    constructor(public time = 0, public duration = 1, public type: lightType = 0, public colors: ColorType[], public lerpType?: "HSV" | "RGB", public easing?: EASE){}
    
    /**push the gradient to the difficulty */
    push() {
        const ev = new LightEvent({time: this.time, type: this.type, value: 1})
        ev.data.color = this.colors[0];
        lights.push(ev)
        let i = 0;
        this.colors.forEach(color =>{
            if(i !== 0){
                const ev = new LightEvent({time: i*this.duration/(this.colors.length-1), type: this.type, value: 4})
                ev.data.color = color;
                if(this.easing){
                    ev.data.easing = this.easing
                }
                if(this.lerpType){
                    ev.data.lerpType = this.lerpType
                }
                lights.push(ev)
            }
            i++
        })
    }
}

export class strobeGenerator {
    /**
     * Creates a linear strobe sequence. With events every "interval" beats.
     * @param time The time to start the strobe.
     * @param duration The duration of the strobe.
     * @param interval How many times per beat to add a strobe event, or one event every 1/interval beats.
     * @param type The event type to use.
     * @param color The on color to use, the off color will always be [0,0,0,0]. Can also be a boolean to use vanilla colors.
     * @param ids Specific ids to target.
     * @param ease Whether to use an easing on the strobe. Any special easings like, bounce, elastic, etc... will yield very weird results.
     * @author Splashcard & Aurellis
     */
    constructor(public time: number, public duration: number, public interval = 1, public type: lightType = 0, public color: ColorType = [1,1,1,1], public ids?: number, public ease?: EASE) {}

    push() {
        repeat(this.duration*this.interval, i => {
            let time = 0
            if(this.ease){
                // "Activate" the import so it works
                e.easeInBack
                time = eval(`e.${this.ease}(${i},${this.time},${this.duration},${this.duration*this.interval})`)
            }
            else {
                time = this.time + i/this.interval
            }
            if(i%2 == 0){
                const on = new LightEvent({time: time, type: this.type, value: 1})
                if(this.ids){
                    on.data.lightID = this.ids
                }
                on.data.color = this.color
                lights.push(on)
            }
            else {
                const off = new LightEvent({time: time, type: this.type, value: 1})
                off.data.color = [0,0,0,0]
                if(this.ids){
                    off.data.lightID = this.ids
                }
                lights.push(off)
            }
        })
    }
}

export class lerpGradient {
    /**
     * A class to ease in the creation of HSV hue-cycling.
     * @param startingColor The color to start from. (HSV)
     * @param loopPoint The number of repeats before returning to the starting color.
     */
    constructor(
        public startingColor: ColorType = [0,1,1,1],
        public loopPoint: number = 10
    ){}
    /**
     * Returns the color at a certain position.
     * @param index The position to check for. (TIP: if index == loopPoint, startingColor will be returned).
     * @param precision How many decimals to include in the final rgb value.
     * @returns Color.
     */
    export(index: number, precision = 2) {
        if(this.startingColor[3]){
          return new Color([(this.startingColor[0]+(index/this.loopPoint))%1,this.startingColor[1],this.startingColor[2],this.startingColor[3]], "HSV").export().map(x =>{return setDecimals(x,precision)}) as ColorType
        }
        else{
          return new Color([(this.startingColor[0]+(index/this.loopPoint))%1,this.startingColor[1],this.startingColor[2],1], "HSV").export().map(x =>{return setDecimals(x,precision)}) as ColorType
        }
    }
}