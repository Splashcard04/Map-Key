import { easeInCirc } from "https://deno.land/x/remapper@3.1.1/src/easings.ts";
import { arrAdd, Geometry, GeometryMaterial, rotatePoint, Vec3 } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { GEO_FILTER_PROPS } from "../constants.ts";
import { logFunctionss, MKLog, repeat } from "./general.ts";

export class Polygon {
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
		public material: GeometryMaterial = { shader: "Standard" },
		public sides: number = 4,
		public radius: number = 10,
		public position: Vec3 = [0, 0, 0],
		public scale: Vec3 = [1, 1, 1],
		public rotation: Vec3 = [0, 0, 0],
		public innercorners: boolean = false,
		public track: string | undefined = undefined,
		public iterateTrack: boolean = true,
		public iterateOffset = 0
	) {}

	/**
	 * Push the shape to the active diff.
	 */
	push() {
		const cube = new Geometry("Cube", this.material);
		for (let side = 0; side < this.sides; side++) {
			// Track assignment
			if (this.track && this.iterateTrack) {
				cube.track.value = `${this.track}_${side + this.iterateOffset}`;
			} else if (this.track && !this.iterateTrack) {
				cube.track.value = this.track;
			}

			// Determine that angle of the side (could have used rotatePoint here, but this was a bit easier)
			const angle = (Math.PI * 2 * side) / this.sides;

			// Apply the offset position to the rotated position
			cube.position = arrAdd(rotatePoint([-Math.sin(angle) * this.radius, -Math.cos(angle) * this.radius, 0], this.rotation), this.position);

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
			if (this.innercorners) {
				cube.scale = [(this.radius - this.scale[1] / 2) * Math.tan(Math.PI / this.sides) * 2, this.scale[1], this.scale[2]];
			} else {
				cube.scale = [(this.radius + this.scale[1] / 2) * Math.tan(Math.PI / this.sides) * 2, this.scale[1], this.scale[2]];
			}

			cube.rotation = [this.rotation[0], this.rotation[1], this.rotation[2] - (180 * angle) / Math.PI];

			cube.push();

			if (logFunctionss) {
				MKLog(`New shape generated...\nsides: ${this.sides}\nradius: ${this.radius}\ntrack: ${this.track}`);
			}
		}
	}
	/**
	 * Returns the array of geometry instead of pushing to the diff.
	 * @param returnProp If defined, the method will return the property of a cube in the shape. [index, property] where index is the cube, and property is either position, scale or rotation.
	 * @returns Geometry array.
	 */
	return(returnProp?: [number, GEO_FILTER_PROPS]) {
		const returnArray = [];
		const cube = new Geometry("Cube", this.material);
		for (let side = 0; side < this.sides; side++) {
			// Track assignment
			if (this.track && this.iterateTrack) {
				cube.track.value = `${this.track}_${side + this.iterateOffset}`;
			} else if (this.track && !this.iterateTrack) {
				cube.track.value = this.track;
			}

			// Determine that angle of the side (could have used rotatePoint here, but this was a bit easier)
			const angle = (Math.PI * 2 * side) / this.sides;

			// Apply the offset position to the rotated position
			cube.position = arrAdd(rotatePoint([-Math.sin(angle) * this.radius, -Math.cos(angle) * this.radius, 0], this.rotation), this.position);
			if (this.innercorners) {
				cube.scale = [(this.radius - this.scale[1] / 2) * Math.tan(Math.PI / this.sides) * 2, this.scale[1], this.scale[2]];
			} else {
				cube.scale = [(this.radius + this.scale[1] / 2) * Math.tan(Math.PI / this.sides) * 2, this.scale[1], this.scale[2]];
			}

			cube.rotation = [this.rotation[0], this.rotation[1], this.rotation[2] - (180 * angle) / Math.PI];

			returnArray.push(cube);
			if (returnProp && side == returnProp[0]) {
				return eval(`cube.${returnProp[1]}`);
			}

			if (logFunctionss) {
				MKLog(`New shape generated...\nsides: ${this.sides}\nradius: ${this.radius}\ntrack: ${this.track}`);
			}
		}
		if (!returnProp) {
			return returnArray as Geometry[];
		}
	}
}

export class primitiveShape {
	collection: Geometry[] = [];
	/**
	 * Generates one of a selection of primitive 3d shapes with Geometry cubes as the edges.
	 * @param material The geo-material to use.
	 * @param position The position of the center of the shape.
	 * @param scale The scale of the individual sides of the shape. (Note - the x value is ignored as it is used to fill the sides).
	 * @param rotation The rotation to apply to the shape.
	 * @param track The track for the shape.
	 * @param iterateTrack (Default - true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < the number of cubes in the shape}
	 * @param iterateOffset The offset to begin iterating tracks from.
	 * @author Aurellis
	 */
	constructor(public material: GeometryMaterial = { shader: "Standard" }, public position: Vec3 = [0, 0, 0], public scale: Vec3 = [1, 1, 1], public rotation: Vec3 = [0, 0, 0], public track: string | undefined = undefined, public iterateTrack: boolean = true, public iterateOffset = 0) {}

	/**
	 * Push the primitive shape to the active diff.
	 */
	push() {
		this.collection.forEach(geo => {
			geo.push();
		});
	}
	/**
	 * Returns the array of geometry that is generated.
	 * @returns Geometry array.
	 */
	return() {
		return this.collection;
	}

	/**
	 * Generates the prism of any regular 2d shape.
	 * @param sides The number of sides. Default - 3.
	 * @param radius The radius of the 2d shape. Default - 10.
	 * @param length The extrusion length of the prism. Default - 10.
	 * @param innerCorners Makes the corners touch on the inside edge of the sides rather than the outside.
	 * @param alignedSides Aligns the rotation of the sides to the nearest clockwise side of the 2d prism base shape.
	 */
	prism(sides = 3, radius = 10, length = 10, innerCorners?: boolean, alignedSides?: boolean) {
		this.collection = [];
		const shape = new Polygon(this.material, sides, radius, arrAdd(rotatePoint([0, 0, -length / 2], this.rotation), this.position), this.scale, this.rotation, innerCorners, this.track, this.iterateTrack, this.iterateOffset);
		let tempArr: Geometry[] = shape.return();
		tempArr.forEach(geo => {
			this.collection.push(geo);
		});
		shape.position = arrAdd(rotatePoint([0, 0, length / 2], this.rotation), this.position);
		shape.iterateOffset = sides + this.iterateOffset;
		tempArr = shape.return();
		tempArr.forEach(geo => {
			this.collection.push(geo);
		});

		const cube = new Geometry("Cube", this.material);
		repeat(sides, side => {
			// Track assignment
			if (this.track && this.iterateTrack) {
				cube.track.value = `${this.track}_${side + 2 * sides + this.iterateOffset}`;
			} else if (this.track && !this.iterateTrack) {
				cube.track.value = this.track;
			}
			let angle = (Math.PI * 2 * (side + 0.5)) / sides;
			let pos;
			if (innerCorners) {
				pos = rotatePoint([-Math.sin(angle) * Math.hypot(radius, (shape.return([0, "scale[0]"]) + shape.return([0, "scale[1]"])) / 2), -Math.cos(angle) * Math.hypot(radius, (shape.return([0, "scale[0]"]) + shape.return([0, "scale[1]"])) / 2), 0], this.rotation);
			} else {
				pos = rotatePoint([-Math.sin(angle) * Math.hypot(radius, (shape.return([0, "scale[0]"]) - shape.return([0, "scale[1]"])) / 2), -Math.cos(angle) * Math.hypot(radius, (shape.return([0, "scale[0]"]) - shape.return([0, "scale[1]"])) / 2), 0], this.rotation);
			}
			cube.position = arrAdd(pos, this.position);
			if (alignedSides) {
				angle = (Math.PI * 2 * (side + 1)) / sides;
			}
			cube.rotation = [this.rotation[0], this.rotation[1], this.rotation[2] - (180 * angle) / Math.PI];
			cube.scale = [this.scale[1], this.scale[1], length + this.scale[2]];
			this.collection.push(cube);
		});
		return this;
	}
	/**
	 * Generates a sphere made of rings.
	 * @param radius The radius of the sphere. Default - 10.
	 * @param rings The number of rings to make the sphere from. Default - 8.
	 * @param segments The number of segments to make each ring out of. Default - 8.
	 * @param innerCorners Makes the segments join at the inner corner of the cubes rather than the outer one.
	 */
	ringSphere(rings = 8, segments = 8, radius = 10, innerCorners?: boolean) {
		this.collection = [];
		const Ring = new Polygon(this.material, segments, radius, this.position, this.scale, this.rotation, innerCorners, this.track, this.iterateTrack, this.iterateOffset);
		repeat(rings, ring => {
			const interpos = Math.cos(((ring + 0.5) * Math.PI) / rings) * radius;
			Ring.position = arrAdd(rotatePoint([0, 0, interpos], this.rotation), this.position);
			Ring.radius = easeInCirc(Math.abs(interpos / radius), radius, -radius, 1);
			const tempArr: Geometry[] = Ring.return();
			tempArr.forEach(geo => {
				this.collection.push(geo);
			});
		});
		return this;
	}
	/**
	 * Generates a cone out of rings.
	 * @param rings The number of rings to make the cone from. Default - 8.
	 * @param segments The number of segments per ring. Default - 4.
	 * @param baseRadius The radius of the base of the cone. Default - 10.
	 * @param depth The depth of the cone. Default - 10.
	 * @param innerCorners Makes the segments join at the inner corner of the cubes rather than the outer one.
	 */
	ringCone(rings = 8, segments = 4, baseRadius = 10, depth = 10, innerCorners?: boolean) {
		this.collection = [];
		const Ring = new Polygon(this.material, segments, baseRadius, this.position, this.scale, this.rotation, innerCorners, this.track, this.iterateTrack, this.iterateOffset);
		repeat(rings, ring => {
			Ring.position = arrAdd(rotatePoint([0, 0, ((ring + 0.5) * depth - rings / 2) / rings], this.rotation), this.position);
			Ring.radius = baseRadius - (ring * baseRadius) / rings;
			const tempArr: Geometry[] = Ring.return();
			tempArr.forEach(geo => {
				this.collection.push(geo);
			});
		});
		return this;
	}
}
