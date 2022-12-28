import { Geometry, RMLog, rotatePoint, Vec3 } from "https://deno.land/x/remapper@3.0.0/src/mod.ts";
import { logFunctionss } from './general.ts'
export class shapeGenerator {
    /**
     * Creates a 2d shape defaulting along the xy plane.
     * @param sides The number of sides.
     * @param radius The radius of the shape.
     * @param position Where to place the center of the shape.
     * @param scale The scale of the individual sides (x value is ignored as it is used to close the edges).
     * @param rotation The rotation to add to the shape, not affected by position.
     * @param material The name of the material to use for the shape (create your own beforehand)
     * @param track Track to apply to the shape.
     * @param innercorners Changes the way that corners are joined. Triangles look better (imo) with inner corners.
     * @param iterateTrack (Default = true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < sides}
     * @author Aurellis
     */
    constructor(
        public material: string,
        public sides: number  = 4,
        public radius: number = 10,
        public position: Vec3 = [0,0,0],
        public scale: Vec3 = [1,1,1],
        public rotation: Vec3 = [0,0,0],
        public innercorners?: boolean,
        public track?: string,
        public iterateTrack: boolean = true
        ){
        this.material = material;
        this.sides = sides;
        this.radius = radius;
        this.position = position;
        this.scale = scale;
        this.rotation = rotation;
        this.innercorners = innercorners;
        this.track = track;
        this.iterateTrack = iterateTrack;
        }
        push(){
            const cube = new Geometry("Cube", this.material);
            for(let side = 0; side < this.sides; side++){
                if(this.track && this.iterateTrack){
                    cube.track.value = `${this.track}_${side}`;
                }
                else if(this.track && !this.iterateTrack){
                    cube.track.value = this.track;
                }
                const angle = Math.PI*2*side/this.sides
                const pos = rotatePoint([-Math.sin(angle)*this.radius,-Math.cos(angle)*this.radius,0],this.rotation);
                cube.position = [pos[0]+this.position[0],pos[1]+this.position[1],pos[2]+this.position[2]];//dumb arrAdd
                if(this.innercorners){
                    cube.scale = [(this.radius-this.scale[1]/2)*Math.tan(Math.PI/this.sides)*2, this.scale[1], this.scale[2]];
                }
                else{
                    cube.scale = [(this.radius+this.scale[1]/2)*Math.tan(Math.PI/this.sides)*2, this.scale[1], this.scale[2]];
                }
                cube.rotation = [this.rotation[0],this.rotation[1],this.rotation[2]-180*angle/Math.PI];
                cube.push();
                
                if(logFunctionss) {
                    RMLog(`New shape generated...\nsides: ${this.sides}\nradius: ${this.radius}\ntrack: ${this.track}`)
                }
            }
        }
}
