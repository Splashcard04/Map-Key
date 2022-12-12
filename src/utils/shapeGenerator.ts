import { Geometry, rotatePoint, Vec3 } from "https://deno.land/x/remapper@3.0.0/src/mod.ts";

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
 * @author Aurellis
 */
export function shape(sides: number, radius: number, position: Vec3, scale: Vec3, rotation: Vec3, material: string, innercorners?: boolean, track?: string){

    const cube = new Geometry("Cube", material);
    if(track){
        cube.track.value = track;
    }
    for(let side = 0; side < sides; side++){
        const angle = Math.PI*2*side/sides
        const pos = rotatePoint([-Math.sin(angle)*radius,-Math.cos(angle)*radius,0],rotation);
        cube.position = [pos[0]+position[0],pos[1]+position[1],pos[2]+position[2]];//dumb arrAdd
        if(innercorners){
            cube.scale = [(radius-scale[1]/2)*Math.tan(Math.PI/sides)*2, scale[1], scale[2]];
        }
        else{
            cube.scale = [(radius+scale[1]/2)*Math.tan(Math.PI/sides)*2, scale[1], scale[2]];
        }
        cube.rotation = [rotation[0],rotation[1],rotation[2]-180*angle/Math.PI];
        cube.push();

    }
}