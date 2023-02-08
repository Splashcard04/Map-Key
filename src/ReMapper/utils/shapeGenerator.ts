import { arrAdd, Geometry, GeometryMaterial, rotatePoint, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { logFunctionss, MKLog } from './general.ts'

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
     * @param iterateOffset An offset to start iterating the tracks from.
     * @author Aurellis
     */
    constructor(
        public material: GeometryMaterial = {shader: "Standard"},
        public sides: number  = 4,
        public radius: number = 10,
        public position: Vec3 = [0,0,0],
        public scale: Vec3 = [1,1,1],
        public rotation: Vec3 = [0,0,0],
        public innercorners: boolean = false,
        public track: string | undefined = undefined,
        public iterateTrack: boolean = true,
        public iterateOffset = 0
        ){}

        /**push the created shape to the difficulty */
        push(){
            const cube = new Geometry("Cube", this.material);
            for(let side = 0; side < this.sides; side++){
                // Track assignment
                if(this.track && this.iterateTrack){
                    cube.track.value = `${this.track}_${side+this.iterateOffset}`;
                }
                else if(this.track && !this.iterateTrack){
                    cube.track.value = this.track;
                }

                // Determine that angle of the side (could have used rotatePoint here, but this was a bit easier)
                const angle = Math.PI*2*side/this.sides;

                // Define the rotated position of the shape
                const pos = rotatePoint([-Math.sin(angle)*this.radius,-Math.cos(angle)*this.radius,0],this.rotation);

                // Apply the offset position to the rotated position
                cube.position = [pos[0]+this.position[0],pos[1]+this.position[1],pos[2]+this.position[2]]; // dumb arrAdd

                /*
                So that I remember how this math works - Aurellis

                The scale is determined by using the "Length of a chord in a circle formula".
                l = 2rsin(theta/2)
                => rsin(theta/2) = l/2 (since l/2 is the opp of a triangle formed by r, l/2, and the line between [0,0,0] and the midpoint of l)
                => since r = hyp and l/2 = opp, therefore sin(theta/2) = 0.5l/r.
                This works for a chord where the ends are r distance from [0,0,0].

                but our case uses a chord where the midpoint is r distance from [0,0,0],
                therefore tan is applicable as opp/adj rather than opp/hyp since r is now adj rather than hyp.
                giving the formula 2rTan(theta/2). where theta = 2pi/2sides or simplified pi/sides.

                then, to account for the fact that the line is 2d rather than 1d,
                the r value can either be radius-scale for the innermost corner to touch,
                or radius+scale for the outermost corners to touch.
                */
                if(this.innercorners){
                    cube.scale = [(this.radius-this.scale[1]/2)*Math.tan(Math.PI/this.sides)*2, this.scale[1], this.scale[2]];
                }
                else{
                    cube.scale = [(this.radius+this.scale[1]/2)*Math.tan(Math.PI/this.sides)*2, this.scale[1], this.scale[2]];
                }

                cube.rotation = [this.rotation[0],this.rotation[1],this.rotation[2]-180*angle/Math.PI];
                cube.push();
                
                if(logFunctionss) {
                    MKLog(`New shape generated...\nsides: ${this.sides}\nradius: ${this.radius}\ntrack: ${this.track}`)
                }
            }
        }
}

export class primitiveGenerator {
    /**
     * Generates one of a selection of primitive 3d shapes with Geometry cubes as the edges.
     * @param material The geo-material to use.
     * @param position The position of the center of the shape.
     * @param scale The scale of the individual sides of the shape. (Note - the x value is ignored as it is used to fill the sides).
     * @param rotation The rotation to apply to the shape.
     * @param track The track for the shape
     * @param iterateTrack (Default = true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < sides}
     */
    constructor(
        public material: GeometryMaterial = {shader: "Standard"},
        public position: Vec3 = [0,0,0],
        public scale: Vec3 = [1,1,1],
        public rotation: Vec3 = [0,0,0],
        public track: string | undefined = undefined,
        public iterateTrack: boolean = true
    ){}

    prism(sides = 3, radius = 10, length = 10, innercorners?: boolean){
        const shape = new shapeGenerator(this.material,sides,radius,arrAdd(rotatePoint([0,0,-length/2],this.rotation), this.position),this.scale,this.rotation,innercorners,this.track,this.iterateTrack)
        shape.push();
        shape.position = arrAdd(rotatePoint([0,0,length/2],this.rotation),this.position)
    }
}