# Intro

Welcome to MapKey!
This library aims to extend the features of [ReMapper](https://github.com/Swifter1243/ReMapper), so it's worth having a bit of knowledge on using ReMapper before using MapKey.
That being said, learning on the spot is great too, so if you'd like to do that, then go ahead.

This document covers most of the main features of MapKey, or any features that may be a bit confusing to use. Please note that this guide is not a complete list of features, but should help to make the rest intuitive to use.

## Importing

To use MapKey in your project, you will need to import it to your script.
You can import the entire MapKey module.

```js
import * as mk from "https://deno.land/x/mapkey@2.0.0/src/ReMapper/mod.ts";
```

This is not recommended though, as you will have to prefix everything from MapKey with `mk.`.
Ideally, you can import the specific items you need into your script.

```js
import { playerAnimation, Polygon } from "https://deno.land/x/mapkey@2.0.0/mod.ts";
```

**Important!**

When you add your import it will likely show an error, hover over the link, click quick fix => cache dependancy.

# Key Features

The following guide will explain the key features of MapKey, note that this is for version `2.0.0`, and will not be consistent with other versions.

## Despawner

This function will remove certain environment objects from your map.
**Example:**

```js
despawn("Contains", ["PlayersPlace", "Mirror"], ["Construction"], ["Clouds"]);
```

This will use the `Contains` lookup to despawn `PlayersPlace` and `Mirror`, then restore `Construction`. It will also "hard despawn" `Clouds`.

### Params

-   lookup: The lookup method to use for despawning objects.
-   ids: The ids of your objects to despawn.
-   restore: (Optional) Objects to restore after despawning.
-   hardDespawn: (Optional) Object to despawn based on the `active` property. These objects canot be used later in your map, and will not be restored by `restore`.

## Light Gradient

A simple gradient creator, this creates a gradient transition for a light over a set number of beats.
**Example:**

```js
new lightGradient(0, 16, [
	[0, 0, 0, 0],
	[0, 1, 0, 1],
	[0, 1, 1, 1],
	[0, 0, 0, 0]
])
	.type(1)
	.push();
```

This will create a gradient from beat 0 to beat 16 on event type 1 (ring lights). The gradient will transition though black, green, aqua, and then black over the 16 beats.

### Params

-   time: The start time of the gradient.
-   duration: How long the gradient should go for.
-   colors: The colors to transition through.
-   type(): The light type of the gradient. i.e., 0 = back lasers, 1 = ring lights, etc.
-   ID(): The light id/s to run the gradient on.
-   lerp(): Whether to lerp HSV or RGB (if you would like to learn more about HSV vs RGB lerp, read [here](https://www.alanzucconi.com/2016/01/06/colour-interpolation/)).
-   easing(): An easing to apply to each color in the gradient.
-   push(): Push your gradient to the active diff.

## Strobe Generator

A simple generator function to create strobe sequences in your map.
**Example:**

```js
strobeGenerator(0, 16, 4, 1, [1, 0, 0, 1]);
```

This will create a strobing sequence that flashes between red and black between beat 0 and beat 16. There will be 4 events every beat, and it will affect the ring lights.

### Params

-   time: The time to begin the strobe.
-   duration: How long the strobe should go for.
-   density: The number of events per beat, or 1 event every `1 / density` beats.
-   type: The light type to strobe on. i.e., 0 = back lasers, 1 = ring lights, etc.
-   color: The color for every "on" event, this can also be a boolean to use vanilla colors.
-   ids: (Optional) The light ids to run the strobe on.
-   ease: (Optional) Whether to use an easing on the strobe.

**Important**
The current update of ReMapper (3.1.2) contains broken easing functions, this won't affect most cases, but it does affect some easings on the strobe generator. This issue does not affect animation or keyframes as they use Unity's easings.

## Material Creator

This class helps to make geometry materials and add them to your map. Also includes a type to help with auto-filling shader keywords.
**Example:**

```js
new geometryMaterial("solidBlack").shader("BTSPillar").push();
```

This will create a new material called `"solidBlack"` that uses the `BTSPillar` shader.

### Params

-   name: The name of your material.
-   shader(): The shader for your material to use.
-   color(): The color of your material.
-   track(): The track of your material.
-   shaderKeywords(): The shader keywords to apply to your material.

### Formatting shader keywords.

To properly apply your shader keywords, they will need to be formatted correctly.
For example, if you are using the `BTSPillar` shader, your keywords should be formatted like:

```js
.shaderKeywords({"BTSPillar": [keyword, keyword, keyword]})
```

## Polygon generator

This class will create a 2d polygon out of geometry cubes.
**Example:**

```js
new Polygon("material", 5, 10, [0, 0, 10], [1, 1, 1]).push();
```

This will create a pentagon out of cubes with the material called `"material"`, the pentagon will have a radius of 10 and the cubes will be 1 meter wide.

### Params

-   material: The name of the material to create the polygon with.
-   sides: The number of sides on the shape.
-   radius: The radius of the shape, this will be the distance form the center to the middle of each side.
-   position: The position of the center to the shape.
-   scale: The scale of each side in the shape, the X value of this is ignored since it is used to fill the sides.
-   rotation: The rotation of the shape.
-   innercorcners: Makes the edges join on the inner corners of each side rather than the outer. This option makes triangles look better.
-   track: The track to give each of the sides of the shape.
-   iterateTrack: (Default = true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < sides}.
-   iterateOffset: The number to start iterating tracks from, the first track number will be this number.
-   push(): Pushes the polygon to the active diff.
-   return(): returns the array of geometry instead of pushing it, this is an advanced feature that only has some very specific uses.

## Primitive Shape Generator

Despite the name, this class is rather useful. It can create several basic 3d shapes from geometry cubes.
Currently, the shapes it can generate are:

-   Prisms: Any 2d shape that has been extruded, this includes cubes.
-   Spheres: These spheres are made out of rings.
-   Cones: This includes pyramids.

**Example:**

```js
new primitiveShape("material", [0, 0, 10], [1, 1, 1]).prism(4, 5, 10, false, true).push();
```

This will create a cube with sides 10 meters in length using the material `"material"`

### Base Params

-   material: The name of the geometry material to create the shape with.
-   position: The position of the center of the shape.
-   scale: The scale of each of the pieces that make up the sides of the shape, X value is ignored as it is used to fill the sides.
-   rotation: The rotation of the shape.
-   track: The track to apply to each piece of the shape.
-   iterateTrack: (Default = true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < the number of cubes in the shape}.
-   iterateOffset: The offset to begin iterating tracks from.

### Prism Params

-   sides: The number of sides of the prism.
-   radius: The radius of the 2d shape at each end.
-   length: The length of the extrustion between each end.
-   innerCorners: Makes the corners touch on the inside edge of each side rather than the outside edge.
-   alignedSides: Aligns the rotation of the sides to the nearest clockwise side of the 2d shape at each end of the prism.

### Ring Sphere Params

-   rings: The number of rings to make the sphere from.
-   segments: The number of segments in each ring.
-   radius: The radius of the sphere.
-   innerCorners: Makes the segments join on the inside edge of each corner rather than the outside edge.

### Ring Cone Params

-   rings: The number of rings to make the cone from.
-   segments: The number of segments in each ring.
-   baseRadius: The radius of the base shape of the cone.
-   depth: The depth of the cone. i.e., the distance from the base to the point.
-   innerCorners: Makes the segments join on the inside edge of each corner rather than the outside edge.
