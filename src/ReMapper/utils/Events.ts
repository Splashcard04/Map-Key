import { activeDiffGet, Json, Eade, ColorType } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

export class gradient {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }
    constructor(time: number, duration: number, type: number, colors: [[1, 1, 1, 1], [1, 1, 1, 1]], easing?: ) {
        this.json.time = time
        this.duration = duration
        this.json.type = type

        this.json.startColor = colors[0]
        this.json.endColor colors[1]
    }

    push() {
        activeDiffGet().basicBeatmapEvents().push({
            "b": this.json.time,
            "t": this.json.type,
            "customData": {
                "lightGradient": {
                    "duration": this.json.duration,
                    "startColor": this.json.startColor,
                    "endColor": this.json.endColor
                }
            }
        })
    }
}

export class strobe {
    json: Json = {}

    import(json: Json){ this.json = json; return this }
    constructor(time: number, duration: number) {
        this.json.time = time
        this.duration = duration
    }

    get interval() { return this.json.interval }
    set interval(interval: number) { this.json.interval = interval }

    get type() { return this.json.type }
    set type(type: number) { this.json.type = type }

    get color() { return this.json.color }
    set color(color: ColorType) { this.json.color = color }

    push() {
        const off = time + 1 / interval
        for(let 1 = 0; i < this.json.interval / this.json.duration; i++) {
            activeDiffGet().basicBeatmapEvents.push({
                "b": this.json.time + 1 / this.json.interval,
                "t": this.json.type,
                "customData": {
                    "color": this.json.color
                }
            })
        }

        for(let i = 0; i < this.json.interval / this.json.duration; i++) {
            activeDiffGet().basicBeatmapEvents.push({
                "b": off + 1 / this.json.interval,
                "t": this.json.type,
                "customData": {
                    "color": this.json.color
                }
            })
        }
    }
}
