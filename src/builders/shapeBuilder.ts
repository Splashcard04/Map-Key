import { Vec3, Json } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"
import { shapeGenerator } from '../utils/shapeGenerator.ts'
import { logFunctionss } from '../utils/general.ts'

export type shapeBuilderSettings = {
    material: string,
    sides: number,
    radius: number,
    position: Vec3,
    scale: Vec3,
    rotation: Vec3,
    innercorners?: boolean,
    track?: string,
    iterateTrack: boolean
}

export class shapeBuilder {
    json: Json = {}

    import(json: Json) {
        this.json = json
        return this
    }

    constructor(settings: shapeBuilderSettings) {
    /**
     * @param {string} material the material of the shape
     * @param {number} sides the ammount of sides on the shape
     * @param {number} radius the radius of the shape
     * @param {Vec3} position the position of the shape
     * @param {Vec3} scale the scale of the shape
     * @param {Vec3} rotation the rotation of the shape
     * @param {boolean} innercorners the inner corners of the shape
     * @param {string} track the track to assign the shape to
     * @param {boolean} iterateTrack iterate the track of the shape?
     * @author Aurellis
     */
    this.json.material = settings.material
    this.json.sides = settings.sides
    this.json.radius = settings.radius
    this.json.position = settings.position
    this.json.scale = settings.scale
    this.json.rotation = settings.rotation
    this.json.innercorners = settings.innercorners
    this.json.track = settings.track
    this.json.iterateTrack = settings.track

    }
    push() {
        new shapeGenerator(this.json.material, this.json.sides, this.json.radius, this.json.position, this.json.scale, this.json.rotation, this.json.innercorners, this.json.track, this.json.iterateTrack).push();

        if(logFunctionss) { console.log(`new shape generated with ${this.json.material} with ${this.json.sides} sides`)}
    }
}